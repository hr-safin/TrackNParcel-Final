import React, { useContext, useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../Hook/useAxiosSecure';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { set } from 'react-hook-form';

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const {id} = useParams()

  const [filter, setFilter] = useState([])

  console.log(id)

  useEffect(() => {
    axiosSecure.get("/payment")
    .then(res => {
        console.log(res.data)

        const filtered = res.data.filter(item => item._id === id)
       console.log(filtered)
       setFilter(filtered)
        
    })
  }, [])

  console.log(filter)

  const totalPrice  = filter.reduce((total, item) => total + item.price, 0)
  console.log(totalPrice)
    useEffect(() => {
       if(totalPrice > 0){
        axiosSecure.post("/create-payment-intent", {price : totalPrice})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [axiosSecure, totalPrice])


    
    

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card
      });

      if (error) {
        console.log("Payment error", error);
        setError(error.message);
      } else {
        console.log("Payment method", paymentMethod);
        setError("");

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "unknown",
              name: user?.displayName || "unknown"
            }
          }
        });

        if (confirmError) {
          console.log("Confirm error", confirmError);
        } else {
          console.log("Payment intent", paymentIntent);

          if (paymentIntent.status === "succeeded") {
            console.log("Transaction ID", paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // Now save the payment in the database
            const paymentInfo = {
              email: user?.email,
              price: totalPrice,
              transactionId: paymentIntent.id,
              date: new Date(),
              payment : "paid"
            };

            axiosSecure.put(`/payments/${id}`, paymentInfo)
              .then((res) => {
                console.log(res.data);
                if (res.data?.modifiedCount > 0) {
                  Swal.fire({
                    title: "Good job!",
                    text: "Payment successful!",
                    icon: "success"
                  });
                  navigate("/dashboard/paymentSuccess");
                }
              })
              .catch((error) => {
                console.error("Error saving payment to the database", error);
              });
          }
        }
      }
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-sm bg-green-600 text-white my-6 w-full' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className='text-red-600 '>{error}</p>
        {transactionId && <p className='text-green-600'>Your Transaction Id: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckOutForm;
