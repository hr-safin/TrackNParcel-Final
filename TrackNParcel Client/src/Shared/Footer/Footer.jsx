import React from "react"
import { Link } from "react-router-dom"
import img from "./box2.png"
export default function Footer() {
  return (
    <>
      {/*    <!-- Component: Dark Theme Footer --> */}
      <footer class="bg-white mt-20">
    <div class="container px-6 py-12 mx-auto">
        <div class="md:flex md:-mx-3 md:items-center md:justify-between">
            <h1 class="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white">Subscribe our newsletter to get update.</h1>
            
            <div class="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
                <Link to="/signIn" class="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-green-600 rounded-lg gap-x-3 hover:bg-green-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    <span>Login Now</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div>
        </div>
        
        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
                <p class="font-semibold text-gray-800 dark:text-white">Quick Link</p>

                <div class="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Who We Are</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Our Philosophy</a>
                </div>
            </div>

            <div>
                <p class="font-semibold text-gray-800 dark:text-white">Industries</p>

                <div class="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Retail & E-Commerce</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Information Technology</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Finance & Insurance</a>
                </div>
            </div>

            <div>
                <p class="font-semibold text-gray-800 dark:text-white">Services</p>

                <div class="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Translation</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Proofreading & Editing</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Content Creation</a>
                </div>
            </div>

            <div>
                <p class="font-semibold text-gray-800 dark:text-white">Contact Us</p>

                <div class="flex flex-col items-start mt-5 space-y-2">
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">+880 768 473 4978</a>
                    <a href="#" class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">info@merakiui.com</a>
                </div>
            </div>
        </div>
        
        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700"/>
        
        <div class="flex flex-col items-center justify-between sm:flex-row">
          <div className=" flex items-center gap-2">
          <img className="w-[40px]" src={img} alt="" />
          <h2 className="mr-4 text-2xl font-bold cursor-pointer">
              TrackNParcel
            </h2>
          </div>
            

            <p class="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright 2023. All Rights Reserved.</p>
        </div>
    </div>
    
</footer>
      {/*    <!-- End Dark Theme Footer --> */}
    </>
  )
}
