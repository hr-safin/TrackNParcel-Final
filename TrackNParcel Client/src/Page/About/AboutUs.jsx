import React from "react";
import NavBar from "../../Shared/NavBar/NavBar";
import "./about.css";
import { CiShoppingCart } from "react-icons/ci";
import { MdPayments } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { Helmet } from "react-helmet";
const AboutUs = () => {
  return (
    <>
       <Helmet>
        <title>TrackNParcel | About Us</title>
      </Helmet>
      <NavBar />
      <div className="w-full  mx-auto">
      <div className="hero min-h-[60vh]" style={{backgroundImage: 'url(https://images.pexels.com/photos/7706466/pexels-photo-7706466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
  <div className="hero-overlay bg-opacity-50"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold pt-16">About Us</h1>
      

    </div>
  </div>
</div>

       
        <div
       
         className=" bg-white lg:px-20 md:px-10 px-4 lg:my-10  my-20 mb-20  flex flex-col lg:flex-row justify-center gap-20 lg:ga-40 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Best Service To Deliver Your Needs 
            </h2>
            <p className=" text-gray-600 lg:w-[500px] pt-6 pb-6">
            express connection to seamless courier services. Swift, secure, and reliable deliveries tailored to meet your needs. Let us redefine the way you send and receive parcels.
              
            </p>
             <div className=" flex gap-10 items-center">
                <div className=" rounded-md text-center text-white px-8 py-5 bg-green-700">
                    <h2 className=" text-4xl font-bold">300</h2>
                    <h2> Trusted Partner</h2>
                </div>
              
                <div className=" rounded-md px-8 text-center text-white py-5 bg-green-700">
                    <h2 className=" text-4xl font-bold">100</h2>
                    <h2>Expert Driver</h2>
                </div>
             
              
             </div>
             
           
          </div>
          <div className="pl-20">
            <img
              className="lg:w-[90%]  md:w-[70%] mx-auto"
              src="https://kitpro.site/delivey/wp-content/uploads/sites/70/2022/02/happy-young-delivery-man-holding-pizza-box-against-2022-02-07-22-22-56-utc-copy2.png"
              alt="User"
            />
          </div>
        </div>

        
      </div>
      <div
        
       className=" pt-16">
        <div className="bg-[#0f172a] px-4 py-20 lg:h-[300px]">
        <h2 className=" text-4xl text-center text-white ">How Delivery Works</h2>
        <p className=" text-gray-600 lg:w-[600px] mx-auto py-3 text-center"> ordering is simple, and delivery is swift. Once you place your order, we handle the rest. Track your parcel in real-time, and our dedicated team ensures a prompt and secure delivery right to your doorstep. Your convenience is our priority.</p>
        </div>

        <div className=" lg:px-14 px-4 -mt-10 grid grid-cols-2 md:grid-cols-2 place-items-center lg:grid-cols-4  gap-4 lg:gap-10">
            <div className=" flex flex-col items-center gap-4">
                <span className=" text-5xl bg-green-700  text-white py-3 px-5 rounded-md"><CiShoppingCart /></span>
                <h1 className=" text-black font-medium text-xl">1. Place Your Order</h1>
                <p className=" text-center">Navigate your deliveries with ease. Real-time tracking ensures you're always in the know. </p>
            </div>
            <div className=" flex flex-col items-center gap-4">
                <span className=" text-5xl bg-green-700  text-white py-3 px-5 rounded-md"><MdPayments /></span>
                <h1 className=" text-black font-medium text-xl">2. Pay Order</h1>
                <p className=" text-center"> Simplify transactions effortlessly. Securely pay for your purchases with ease. </p>
            </div>
            <div className=" flex flex-col items-center gap-4">
                <span className=" text-5xl bg-green-700  text-white py-3 px-5 rounded-md"><CiDeliveryTruck /></span>
                <h1 className=" text-black font-medium text-xl">3. Order Delivered</h1>
                <p className=" text-center">Effortless tracking for your peace of mind. Stay informed in real-time and get it in time. </p>
            </div>
            <div className=" flex flex-col items-center gap-4">
                <span className=" text-5xl bg-green-700  text-white py-3 px-5 rounded-md"><FaBoxOpen /></span>
                <h1 className=" text-black font-medium text-xl">4. Receive  Order</h1>
                <p className=" text-center">Easy tracking keeps you informed as your package reaches and hassle-free deliveries. </p>
            </div>
        </div>
        
    </div>
    </>
  );
};

export default AboutUs;
