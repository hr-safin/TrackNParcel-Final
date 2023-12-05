import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "../Hook/useAxiosSecure";
const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [bookingDate, setBookingDate] = useState([]);

  useEffect(() => {
    axiosSecure.get("/booking-by-date").then((res) => {
      console.log(res.data);
      setBookingDate(res.data);
    });
  }, []);

  const dates = bookingDate.map((item) => item._id);
  const counts = bookingDate.map((item) => item.count);
  const chartOptions = {
    xaxis: {
      categories: dates,
    },
    colors: ['#008000'],
  };
  return (
    <div>
      <div className=" text-4xl text-center font-bold pt-8">
        <h2>Admin Home</h2>
      </div>
      <div className=" flex justify-center items-center h-[70vh]">
        <Chart
          options={chartOptions}
          series={[{ name: "Bookings", data: counts }]}
          type="bar"
          width={600}
        />
      </div>
    </div>
  );
};

export default AdminHome;
