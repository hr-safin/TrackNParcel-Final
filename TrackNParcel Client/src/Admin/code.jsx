import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";

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
const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);
  
  const [selectedId, setSelectedId] = useState(null)
  const [deliveryMen, setDelivery] = useState([]);
  const handleOpen = (isOpen) => {
    setOpen(isOpen);
    
  };

  const handleId = (id) => {
    console.log(id)
    setSelectedId(id)
  }

  const { data: parcel = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/parcel");
      return res.data;
    },
  });

  useEffect(() => {
    axiosSecure.get("/deliveryMen").then((res) => {
      console.log(res.data);
      setDelivery(res.data);
    });
  }, []);

  const { register, handleSubmit, reset } = useForm()
  
 console.log(selectedId)
  const onSubmit = (data) => {
    console.log(data)

    const deliveryMenId = data.id
    const  approximateDeliveryDate = data.date
    const  deliveryMenEmail = data.email
    const status = "On The Way"

    const parcelInfo = {deliveryMenId, approximateDeliveryDate,deliveryMenEmail, status}
    console.log(parcelInfo)

    axiosSecure.put(`/admin/parcel/${selectedId}`, parcelInfo)
    .then(res => {
      console.log(res.data)
      if(res.data.modifiedCount > 0){
        alert("Delivery Men Successfully Assign")
        refetch()
        reset()
      }
    })
  }

  
  return (
    <div>
      <div className=" text-4xl text-center font-bold pt-20">
        <h2>All Parcel</h2>
      </div>
      <div className=" pt-10 lg:px-16">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User's Name</th>
                <th>User's Phone</th>
                <th>Booking Date</th>
                <th>Requested Delivery Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {parcel.map((item, i) => (
                <tr>
                  <th>{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.bookingDate}</td>
                  <td>{item.requestedDeliveryDate}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td>
                    <>
                      <Button color="green" onClick={() =>{
                        handleOpen(true),
                        handleId(item._id)
                      } }>
                        Manage
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
                                  for="date"
                                >
                                  Approximate delivery date
                                </label>
                                <input
                                  id="date"
                                  {...register("date", { required: true })}
                                  type="date"
                                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  class="text-gray-700 dark:text-gray-200"
                                  for="id"
                                >
                                  DeliveryMen Id
                                </label>
                                <input
                                  id="id"
                                  {...register("id", { required: true })}
                                  type="text"
                                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                  required
                                />
                              </div>
                              {/* <div>
                                <label
                                  class="text-gray-700 dark:text-gray-200"
                                  for="email"
                                >
                                  DeliveryMen Email
                                </label>
                                <input
                                  id="email"
                                  {...register("email", { required: true })}
                                  type="email"
                                  defaultValue={item.email}
                                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                  required
                                />
                              </div> */}
                              <div>
                                <label
                                  for="type"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  DeliveryMen List
                                </label>
                                <select
                                  {...register("list", { required: true })}
                                  id="type"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  {deliveryMen.map((item) => {
                                    return (
                                      <option key={item._id} value={item.name}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div>
                                <label
                                  for="type"
                                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  DeliveryMen Email
                                </label>
                                <select
                                  {...register("email", { required: true })}
                                  id="email"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                  {deliveryMen.map((item) => {
                                    return (
                                      <option key={item._id} value={item.email}>
                                        {item.email}
                                      </option>
                                    );
                                  })}
                                </select>
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
                                Assign
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

export default AllParcel;
