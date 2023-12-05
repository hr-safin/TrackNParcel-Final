import React from "react";
import NavBar from "../../Shared/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./style.css";
import image from "./image.gif";
import { Helmet } from "react-helmet";
import FeatureSection from "./FeatureSection";
import Statistic from "./statistic";
import TopDeliveryMen from "./TopDeliveryMen";


const Home = () => {
  return (
    <>
    <Helmet>
        <title>TrackNParcel | Home</title>
      </Helmet>
    <div 
    
    >
      
      <NavBar />
      
      <div
       
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://demo.cmssuperheroes.com/themeforest/primous/wp-content/uploads/slider1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div
       
        className="hero-content text-center text-neutral-content">
          <div className="max-w-3xl pt-10">
            <div 
            
            className="  ">
            <h2 className=" text-5xl text-white  font-bold pb-5 pt-4">
              Reliable Service Every Time
            </h2>

            <p className=" text-gray-300 pb-7 font-bold text-4xl">
              Effortless tracking and easy organization. 
            </p>

            <form className=" w-full md:w-[70%] mx-auto">
              <label
                for="search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Go
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  class="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter your delivery address"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-green-800 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
      <FeatureSection />
      <Statistic />
      <TopDeliveryMen />
    </div>
    </>
    
  );
};

export default Home;
