import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FiPackage } from "react-icons/fi";
import { LuTruck } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
const FeatureSection = () => {
  return (
    <div
    >
      <div className=" flex justify-center items-center text-3xl md:text-4xl font-bold pt-20">
        Our Feature
      </div>

      <div className=" lg:px-24 px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10 p-10">
        <div>
          <Card className="mt-6 ">
            <CardBody className=" text-center">
                <div className=" flex justify-center items-center pb-3">
                <span className=" text-5xl text-green-700 mx-auto "><FiPackage className=" text-center" /></span>
                </div>
              
              <Typography variant="h5" color="blue-gray" className="mb-2">
              Secure Packaging
              </Typography>
              <Typography>
              Our secure packaging safeguards your parcels, providing peace of mind for both senders and recipients.
              </Typography>
            </CardBody>
           
          </Card>
        </div>
        <div>
          <Card className="mt-6 ">
            <CardBody className=" text-center">
            <div className=" flex justify-center items-center pb-3">
                <span className=" text-5xl text-green-700 mx-auto "><LuTruck /></span>
                </div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
              Super Fast Delivery
              </Typography>
              <Typography>
              Experience the speed with our super-fast delivery service, getting your parcels to their destination promptly.
              </Typography>
            </CardBody>
            
          </Card>
        </div>
        <div>
          <Card className="mt-6 ">
            <CardBody className=" text-center">
            <div className=" flex justify-center items-center pb-3">
                <span className=" text-5xl text-green-700 mx-auto "><GrMapLocation /></span>
                </div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
              Real-Time Tracking
              </Typography>
              <Typography>
              TrackNParcel offers real-time tracking, empowering you to monitor your shipments with live updates and accuracy.
              </Typography>
            </CardBody>
           
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
