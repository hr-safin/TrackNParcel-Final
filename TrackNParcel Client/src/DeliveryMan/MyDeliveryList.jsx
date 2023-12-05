import React, { useContext } from "react";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { button } from "@material-tailwind/react";
import SeeLocation from "./SeeLocation";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const MyDeliveryList = () => {

  const axiosPublic = useAxiosPublic()
  const {user} = useContext(AuthContext)

  const {data : list =[], refetch} = useQuery({
    queryKey : [user?.email, "list"],
    queryFn : async () => {
      const res = await axiosPublic.get(`/deliveryList/${user?.email}`)
      console.log(res.data)
      return res.data
    }
  })

  const handleCancel =(id) => {
    const status = "Cancelled"
    const parcelInfo = {status}
   axiosPublic.put(`/delivery/parcel/${id}`, parcelInfo)
   .then(res => {
    console.log(res.data)
    if(res.data.modifiedCount > 0){
      Swal.fire({
        title: "Good job!",
        text: "Cancelled This parcel!",
        icon: "success"
      });
      refetch()
    }
   })
  }
  const handleDeliver =(id) => {
    const status = "Delivered"
    const parcelInfo = {status}
   axiosPublic.put(`/delivery/parcel/${id}`, parcelInfo)
   .then(res => {
    console.log(res.data)
    if(res.data.modifiedCount > 0){
      Swal.fire({
        title: "Good job!",
        text: "The parcel has been delivered!",
        icon: "success"
      });
      refetch()
    }
   })
  }
  const handleReturn =(id) => {
    const status = "Return"
    const parcelInfo = {status}
   axiosPublic.put(`/delivery/parcel/${id}`, parcelInfo)
   .then(res => {
    console.log(res.data)
    if(res.data.modifiedCount > 0){
      Swal.fire({
        title: "Good job!",
        text: "Returned This parcel!",
        icon: "success"
      });
      
      refetch()
    }
   })
  }
  return (
    <div className="overflow-x-auto">
      <div className=" text-4xl text-center font-bold pt-8">
        <h2>My Delivery List</h2>
      </div>
      <div className=" pt-16 overflow-hidden max-w-full">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Booked User’s Name</th>
                <th>Receivers Name</th>
                <th>Booked User’s Phone</th>
                <th>Requested Delivery Date</th>
                <th>Approximate Delivery Date</th>
                <th>Receiver's phone number</th>
                <th>Receivers Address</th>
                <th>Location</th>
                <th>Cancel</th>
                <th>Deliver</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {list.map((item, index) => 
                
                <tr>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.receiverName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.requestedDeliveryDate}</td>
                <td>{item.approximateDeliveryDate}</td>
                <td>{item.receiverPhone}</td>
                <td>{item.receiverAddress}</td>
                <td>
                  <SeeLocation longitude={item.deliveryLongitude}  latitude={item.deliveryLatitude} />
                </td>
                <td>
                  {item.status === "Cancelled" || item.status === "Delivered" ? 
                  <button disabled className="btn btn-sm bg-red-500">Cancel</button>
                :
                <button onClick={() => handleCancel(item._id)} className=" btn btn-sm bg-red-500">cancel</button>
                }
                  
                  
                  </td>
                <td>
                  {item.status === "Cancelled"
                  ?
                  <button disabled className="btn btn-sm bg-green-500">Deliver</button>
                  :
                  <button disabled={item.status === "Delivered"} onClick={() => handleDeliver(item._id)} className=" btn btn-sm text-white hover:bg-green-600 bg-green-500">{item.status === "Delivered" ? "Delivered" : "Deliver" }</button>
                  }
                
                  </td>

                  <td>
                    {item.status === "Delivered" ? <button onClick={() => handleReturn(item._id)} className=" btn btn-sm bg-red-500">Return</button>
                    :
                    <button disabled className=" btn btn-sm bg-red-500">Return</button>
                  }
                 
                  </td>
                
                
              </tr>
                )}
             
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDeliveryList;
