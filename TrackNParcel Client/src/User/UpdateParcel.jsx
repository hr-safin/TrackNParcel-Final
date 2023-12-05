import React, { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hook/useAxiosPublic";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const UpdateParcel = () => {
  const { user } = useContext(AuthContext);

   const data = useLoaderData()
   const {id} = useParams()
   console.log(id)
   console.log(data)
  const axiosPublic = useAxiosPublic()

   

    
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
            status : "pending"
        }
        console.log("infi", parcelInfo)

        axiosPublic.put(`/users/parcels/${data._id}`, parcelInfo)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
              Swal.fire({
                title: "Good job!",
                text: "Booking Updated Successfully!",
                icon: "success"
              });
            
            }
        })

} 
  return (
    <div>
      <div className=" text-4xl text-center font-bold pt-20">
        <h2>Update Your Booking</h2>
      </div>

      <div className=" max-w-2xl mx-auto pt-10">
        <div class="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
          <form onSubmit={handleSubmit}>
            <div class="-mx-2 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  {" "}
                  Name
                </label>
                <input
                  defaultValue={user?.displayName}
                  type="text"
                  name="name"
                  placeholder="name "
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  readOnly
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email{" "}
                </label>
                <input
                  defaultValue={user?.email}
                  type="email"
                  name="email"
                  placeholder="email"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  readOnly
                />
              </div>
            </div>
            <div class="-mx-2 pt-3 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                defaultValue={data.phoneNumber}
                  type="number"
                  name="number"
                  placeholder="number "
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div class="flex-1  px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Parcel Type
                </label>
                <input
                  type="text"
                  defaultValue={data.parcelType}
                  placeholder="parcel type"
                  name="parcel"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
            </div>
            <div class="-mx-2 pt-3 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Parcel Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  onChange={handleWeightChange}
                  defaultValue={data.parcelWeight}
                  placeholder="weight "
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Receiver’s Name
                </label>
                <input
                  type="text"
                  defaultValue={data.receiverName}
                  name="receiverName"
                  placeholder="receiver’s name"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
            </div>
            <div class="-mx-2 pt-3 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Receiver's Phone Number
                </label>
                <input
                  type="number"
                  defaultValue={data.receiverPhone}
                  placeholder="receiver's phone number "
                  name="number3"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Parcel Delivery Address
                </label>
                <input
                  type="text"
                  placeholder="parcel delivery address"
                  defaultValue={data.receiverAddress}
                  name="address"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
            </div>
            <div class="-mx-2 pt-3 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Requested Delivery Date
                </label>
                <input
                  type="date"
                  defaultValue={data.
                    requestedDeliveryDate}
                  placeholder="requested delivery date "
                  name="date"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Delivery Address Latitude
                </label>
                <input
                  defaultValue={data.deliveryLatitude}
                  type="text"
                  name="latitude"
                  placeholder="latitude"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
            </div>
            <div class="-mx-2 pt-3 md:items-center md:flex">
              <div class="flex-1 px-2">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price || data.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div class="flex-1 px-2 mt-4 md:mt-0">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Delivery Address longitude
                </label>
                <input
                  defaultValue={data.deliveryLongitude}
                  type="text"
                  placeholder="longitude"
                  name="longitude"
                  class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
            </div>

            <button class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-700 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Update Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateParcel;
