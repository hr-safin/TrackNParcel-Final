import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  const recordPage = 5;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const records = users.slice(firstIndex, lastIndex);
  const numberPage = Math.ceil(users.length / recordPage);
  const numbers = [...Array(numberPage + 1).keys()].slice(1);

  const prePage = () => {
    if(currentPage !== 1){
        setCurrentPage(currentPage -1)
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id)
  };
  const nextPage = () => {
    if(currentPage !== numberPage){
        setCurrentPage(currentPage + 1)
    }
  };


  const { data: parcel = [] } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/parcel");
      console.log(res.data);
      return res.data;
    },
  });

  const getParcelCountByEmail = (email) => {
    const userParcels = parcel.filter((p) => p.email === email);
    return userParcels.length;
  }

  

 

  const handleMakeAdmin = (item) => {
    axiosSecure.put(`/users/admin/${item._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0){
             alert("Admin")
             refetch()
        }
    })
  }
  const hanldeMakeDelivery = (item) => {
    axiosSecure.put(`/users/delivery/${item._id}`)
    .then(res => {
        if(res.data.modifiedCount > 0){
             alert("delivery")
             refetch()
        }
    })
  }

  

  return (
    <div>
      <div className="flex justify-center text-center pt-16 items-center">
        <h2 className=" text-center text-3xl font-bold pb-10" >All User</h2>
      </div>

      <div className="overflow-x-auto mx-auto w-full lg:px-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr className=" bg-gray-200">
              <th></th>
              <th>Name</th>
              <th>Phone</th>
              <th>Parcel Booked</th>
              <th>make deliverymen</th>
              <th>make admin</th>
             
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {records.map((item,i) => (
              <tr className="">
                <th>{i+1}</th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{getParcelCountByEmail(item.email)}</td>
                <td>
                <button onClick={() => hanldeMakeDelivery(item)}>{item.type === "admin" ?  <button disabled>admin</button> : item.type === "deliveryMen" ? "deliveryMen" :"user"}</button>
                </td>
                <td>
                <button onClick={() => handleMakeAdmin(item)}>{item.type === "admin" ? "admin" : item.type === "deliveryMen" ? <button disabled>deliveryMen</button> :"user"}</button>
                </td>
               
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className=" flex justify-center items-center pt-5">
        <ul className=" flex gap-3 justify-center items-center pt-5">
          <li className=" text-green-700">
            <button onClick={prePage}>prev</button>
          </li>
          {numbers.map((n, i) => (
            <li className={`${currentPage === n ? "active bg-green-700 text-white py-1 px-3 rounded-md " : ""}`} key={i}>
              <button onClick={() => changeCPage(n)}>{n}</button>
            </li>
          ))}
          <li className=" text-green-700">
            <button onClick={nextPage}>next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AllUser;
