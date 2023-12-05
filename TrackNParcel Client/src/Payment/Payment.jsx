import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';


const Payment_Gateway = "pk_test_51OEWOiDrduCbZi0VLPT7T9eLn2TvSS9tXvPPjYobROOoRrllCLoTp2vyShnGnVvM7ahdy3x44PvHK3tQZXfFNR6P00oSh3z0UK"
const stripePromise = loadStripe(Payment_Gateway)
const Payment = () => {

 
   const {id} = useParams()

   console.log(id)
     
    return (
        <div className=' h-[60vh] flex flex-col justify-center max-w-lg mx-auto'>
            <div className=' flex justify-center items-center '>
                <h2 className=' text-3xl font-bold pb-16 '>Payment</h2>
            </div>
            <div  className=''>
               <Elements stripe={stripePromise}>
                    <CheckOutForm id={id}></CheckOutForm>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;