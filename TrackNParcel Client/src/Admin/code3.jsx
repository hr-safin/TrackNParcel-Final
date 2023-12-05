import React from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryMen = [], refetch } = useQuery({
      queryKey: ["deliveryMen"],
      queryFn: async () => {
        const res = await axiosSecure.get("/admin/deliveryMen");
        return res.data;
      },
    });
  return (
    <div>
      <div className=" text-4xl text-center font-bold pt-20">
        <h2>All DeliveryMen</h2>
      </div>

      <div className=" lg:px-16 pt-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Delivery Man's Name</th>
                <th>Phone Number</th>
                <th>Number of parcel delivered</th>
                <th>Average review</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {deliveryMen.map((item, index) => 
                <tr>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.deliveredCount}</td>
                <td>N/A</td>
              </tr>
                
                )}
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDeliveryMan;
