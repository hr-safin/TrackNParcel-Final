import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const MyParcel = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data)


    const userName = user?.displayName
    const userImage = user?.photoURL
    const feedBack = data.feed
    const rating = data.rate
    const deliveryMenId = data.id
    const reviewDate = data.date

    const reviewInfo = {userName,userImage,feedBack,rating,deliveryMenId,reviewDate}

    console.log(reviewInfo)

    axiosPublic.post("/reviews", reviewInfo)
    .then(res => {
       console.log(res.data)
       if(res.data.insertedId){
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for your review!",
          showConfirmButton: false,
          timer: 1500
        });
       }
    })
  
   

    


    
  }

  const { data: parcel = [], refetch } = useQuery({
    queryKey: [user?.email, "parcel"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/parcel/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  

  
  const parcelSearchItem = parcel.filter((item) => {
    if (selectedStatus === "all") {
      return true; 
    } else {
      return item.status.toLowerCase() === selectedStatus.toLowerCase();
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/users/parcel/${id}`).then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Deleted!",
            text: "Booking parcel has been deleted.",
            icon: "success",
          });
          refetch()
        });
        
      }
    });
  };

  return (
    <div>
      <div className=" flex justify-center items-center">
        <h2 className=" text-4xl font-bold pt-16">My Parcel</h2>
      </div>

      <div className="pt-16 lg:px-10">
        {/* Add the select element */}
        
        <select
          className="text-black border-2 w-[200px] border-green-600 rounded-md mb-3 px-3 py-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="onTheWay">On the Way</option>
          <option value="return">Return</option>
        </select>

        {/* ... rest of the code */}

        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
              <th>#</th>
                <th>ParcelType</th>
                <th>Requested Delivery Date,</th>
                <th>Approximate Delivery Date</th>
                <th>Booking Date</th>
                <th>Delivery Men ID</th>
                <th>Status</th>
                <th>Update</th>
                <th>Cancel</th>
                <th>Review</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
            {parcelSearchItem.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.parcelType}</td>
                  <td>{item.requestedDeliveryDate}</td>
                  <td>1 - 3 Days</td>
                  <td>{item.bookingDate}</td>
                  <td>{item.deliveryMenId}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status === "pending" ? (
                      <Link
                        to={`/dashboard/updateParcel/${item._id}`}
                        className=" px-4 py-2 bg-green-500 text-white text-sm rounded-md"
                      >
                        Update
                      </Link>
                    ) : (
                      <button
                        disabled
                        className=" px-4 py-2 bg-green-500 text-white text-sm rounded-md"
                      >
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    {item.status === "pending" && (
                      <button
                        onClick={() => handleDelete(item._id)}
                        className=" px-4 py-2 bg-red-500 text-sm text-white rounded-md"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                  <td>{item.status === "Delivered" ? 
                  <>
                  <Button color="green" onClick={ () =>
                    handleOpen(true) }>
                    Review
                  </Button>
                  <Dialog
                    size="xs"
                    open={open}
                    handler={() => handleOpen(true)}
                    className="bg-white shadow-none"
                  >
                    <Card className="mx-auto w-full max-w-[24rem]">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <CardBody className="flex flex-col gap-4">
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="name"
                            >
                              User’s Name
                            </label>
                            <input
                              id="name"
                              defaultValue={user?.displayName}
                              {...register("name", { required: true })}
                              type="text"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="image"
                            >
                              User’s Image
                            </label>
                            <input
                              id="image"
                              defaultValue={user?.photoURL}
                              {...register("image", { required: true })}
                              type="text"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="rate"
                            >
                              Rating out of 5
                            </label>
                            <input
                              id="rate"
                              {...register("rate", { required: true })}
                              type="text"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="feed"
                            >
                              Feedback
                            </label>
                            <input
                              id="feed"
                              {...register("feed", { required: true })}
                              type="text"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="feed"
                            >
                              Delivery Men’s Id
                            </label>
                            <input
                              id="id"
                              defaultValue={item.deliveryMenId}
                              {...register("id", { required: true })}
                              type="text"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          <div>
                            <label
                              class="text-gray-700 dark:text-gray-200"
                              for="rate"
                            >
                              Review Date
                            </label>
                            <input
                              id="date"
                              {...register("date", { required: true })}
                              type="date"
                              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                              required
                            />
                          </div>
                          
                          
                         
                        </CardBody>

                        <div className="flex gap-10 p-6">
                          <Button
                           type="submit"
                            color="green"
                            variant="gradient"
                            fullWidth
                            onClick={() => handleOpen(false)}
                          >
                            Submit
                          </Button>
                          <Button
                            color="red"
                            variant="gradient"
                            onClick={() => handleOpen(false)}
                            fullWidth
                          >
                            Close
                          </Button>
                        </div>
                      </form>
                    </Card>
                  </Dialog>
                </>
                  
                  : "------"}</td>
                  <td>
                  {item.payment === "paid" ? (
                    
                      <button
                        disabled
                        className=" px-4 py-2 bg-gray-700 text-white text-sm rounded-md"
                      >
                        Pay
                      </button>
                      )
                     : (
                     <Link
                        to={`/dashboard/payment/${item._id}`}
                        className=" px-4 py-2 bg-orange-400 text-white text-sm rounded-md"
                      >
                        Pay
                      </Link>
                    )}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcel;
