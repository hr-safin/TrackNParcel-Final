import { useWindowSize } from "@react-hook/window-size";
import React from "react";

import Confetti from "react-confetti";
const PaymentSuccess = () => {
    const { width, height } = useWindowSize()
  return (
    <div>
        <div className=" flex text-5xl justify-center items-center h-[80vh]">
            Payment Successful
        </div>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default PaymentSuccess;
