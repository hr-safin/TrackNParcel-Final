import React from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "@material-tailwind/react";
const TopDeliveryMen = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topDeliveryMen = [], refetch } = useQuery({
    queryKey: ["topDeliveryMen"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/topDeliveryMen");
      return res.data;
    },
  });

  console.log(topDeliveryMen);

  return (
    <div>
      <div className="text-4xl text-center font-bold pt-20">
        <h2>Top Delivery Men</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16 gap-20 lg:px-24 px-4">
        {topDeliveryMen.map((deliveryMan, index) => (
          // <div key={index} className="m-4 bg-white p- pt-166 shadow-md rounded-md">
          //   <h3 className="text-lg font-bold">{deliveryMan.name}</h3>
          //   <img src={deliveryMan.image} alt={deliveryMan.name} className="mt-2 w-32 h-32 object-cover rounded-full" />
          //   <p className="mt-2">Parcels Delivered: {deliveryMan.deliveredCount}</p>
          //   <p>Average Rating: {deliveryMan.averageReview}</p>
          // </div>
          <div class="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img
              class="object-cover w-full h-56"
              src={deliveryMan.image}
              alt="avatar"
            />

            <div class="py-5 text-center space-y-2">
              <a
                href="#"
                class="block text-xl pb-2 font-bold text-gray-800 dark:text-white"
                tabindex="0"
                role="link"
              >
                {deliveryMan.name}
              </a>
              <span class="text-xl font-bold text-gray-700 dark:text-gray-200">
               {deliveryMan.deliveredCount}   Parcels Delivered
              </span>
              <div className=" flex gap-4 items-center justify-center">
            <span className=" text-2xl">{deliveryMan.averageReview}</span>
            <Rating ratedColor="green" value={parseFloat(deliveryMan.averageReview)} />
            </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMen;
