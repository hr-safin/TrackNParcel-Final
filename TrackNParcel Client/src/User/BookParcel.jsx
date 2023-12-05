import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxiosPublic from '../Hook/useAxiosPublic';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const BookParcel = () => {
    const {user} = useContext(AuthContext)

    const axiosPublic = useAxiosPublic()

    
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Function to update the current date
        const updateDate = () => {
          const now = new Date();
          const formattedDate = now.toLocaleDateString(); // You can customize the date format
          setCurrentDate(formattedDate);
        };
    
        // Update the date initially when the component mounts
        updateDate();
      }, []);
    const [price, setPrice] = useState(0); // State variable to hold the calculated price

    const handleWeightChange = (e) => {
        const weight = parseInt(e.target.value, 10);
        let calculatedPrice = 0;

        // Add your pricing logic here
        if (weight === 1) {
            calculatedPrice = 50;
        } else if (weight === 2) {
            calculatedPrice = 100;
        } else if (weight > 2) {
            calculatedPrice = 150;
        }

        setPrice(calculatedPrice);
    };




    const handleSubmit = (e) => {
        e.preventDefault()
        const name  = user?.displayName
        const email  = user?.email
        const phoneNumber = e.target.number.value
        const parcelType = e.target.parcel.value
        const parcelWeight = e.target.weight.value
        const receiverName = e.target.receiverName.value
        const receiverPhone = e.target.number3.value
        const receiverAddress = e.target.address.value
        const requestedDeliveryDate = e.target.date.value
        const deliveryLatitude = e.target.latitude.value
        const deliveryLongitude = e.target.longitude.value
        const price = e.target.price.value

        const parcelInfo = {
            name,
            email,
            phoneNumber,
            parcelType,
            parcelWeight,
            receiverName,
            receiverAddress,
            receiverPhone,
            requestedDeliveryDate,
            deliveryLatitude,
            deliveryLongitude,
            price : price,
            status : "pending",
            bookingDate : currentDate
        }
        console.log("infi", parcelInfo)

        axiosPublic.post("/users/parcel", parcelInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                    title: "Good job!",
                    text: "Booking Successful!",
                    icon: "success"
                  });
                
                
            }
        })
        
        

        
    }
    return (
        <div>
            <div className=' text-4xl text-center font-bold pt-8'>
                <h2>Book A Parcel</h2>
            </div>
            <div className=' max-w-2xl mx-auto pt-10'>
            <div class="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
                <form  onSubmit={handleSubmit}>
                    <div class="-mx-2 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"> Name</label>
                            <input defaultValue={user?.displayName} type="text" name='name' placeholder="name " class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" readOnly />
                        </div>

                        <div class="flex-1 px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email </label>
                            <input defaultValue={user?.email} type="email" name='email' placeholder="email" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" readOnly />
                        </div>
                    </div>
                    <div class="-mx-2 pt-3 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone Number</label>
                            <input   type="number" name='number' placeholder="number " class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div class="flex-1  px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Parcel Type</label>
                            <input   type="text" placeholder="parcel type" name='parcel' class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                    </div>
                    <div class="-mx-2 pt-3 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Parcel Weight</label>
                            <input  onChange={handleWeightChange}   type="number" name='weight' placeholder="weight " class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div class="flex-1 px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Receiver’s Name</label>
                            <input   type="text" name='receiverName' placeholder="receiver’s name" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                    </div>
                    <div class="-mx-2 pt-3 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Receiver's Phone Number</label>
                            <input  type="number" placeholder="receiver's phone number " name='number3' class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div class="flex-1 px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Parcel Delivery Address</label>
                            <input type="text" placeholder="parcel delivery address" name='address' class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                    </div>
                    <div class="-mx-2 pt-3 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Requested Delivery Date</label>
                            <input  type="date" placeholder="requested delivery date " name='date' class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div class="flex-1 px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Delivery Address Latitude</label>
                            <input   type="text" name='latitude' placeholder="latitude" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                    </div>
                    <div class="-mx-2 pt-3 md:items-center md:flex">
                        <div class="flex-1 px-2">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Price</label>
                            <input value={price}   type="number" placeholder="price" 
                            name="price" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required  />
                        </div>

                        <div class="flex-1 px-2 mt-4 md:mt-0">
                            <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Delivery Address longitude</label>
                            <input   type="text" placeholder="longitude" 
                            name="longitude" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                    </div>

                    

                    <button  class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-700 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        Book Now
                    </button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default BookParcel;