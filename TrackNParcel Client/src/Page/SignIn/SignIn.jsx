import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import {toast} from 'react-hot-toast';
import useAxiosPublic from '../../Hook/useAxiosPublic';

const SignIn = () => {

    const axiosPublic = useAxiosPublic()

    const {user, signIn,googleLogin} = useContext(AuthContext)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form =e.target
        const email = form.email.value
        const password = form.password.value
        console.log( email, password)
        console.log("clicked")

        setError("")
        const toastId = toast.loading("Sign In Successful")
        signIn(email, password)
        .then((result) => {
            console.log(result.user)
            toast.success("Sign In Successful", {id : toastId})
            navigate("/")

        })
        .catch((error) => {
            setError("password or email is invalid")
        })
    }


    const handleGoogle = () => {

        const toastId = toast.loading("Sign In Successful")
        googleLogin()
        .then((result) => {
            const userDetails = {
                name : result.user?.displayName,
                email : result.user?.email,
                photo : result.user?.photoURL,
                type : "user"
            }
            axiosPublic.post("/users", userDetails)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    toast.success("Sign In Successful", {id : toastId})
                    navigate("/")
                }
                else{
                    toast.success("Sign In Successful", {id : toastId})
                    navigate("/") 
                }
            })
            
        })
        .catch((error) => {
            console.log(error)
        })
    }






    return (
        <div className=''>
            <section className=" h-screen flex justify-center items-center">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-20 w-full lg:w-[90%]">
      
      <div className="w-[95%] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl text-center font-bold leading-tight tracking-tight pb-3 text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  {error && <p className='py-2 text-red-500'>{error}</p>}
                  
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>

                  <div className=' flex items-center w-full gap-4'>
                    <div className=' border w-44 border-gray-300'></div>
                    <div>
                        or
                    </div>
                    <div className=' border w-44 border-gray-300'></div>
                  </div>
                  
                  <div className=" space-y-3 lg:py-1">
                  <button
                    onClick={handleGoogle}
                    type="button"
                    className=" inline-flex w-full items-center justify-center rounded-md border  text-gray-700 dark:text-gray-400 dark:bg-slate-800 dark:border-gray-700 border-gray-400 bg-white px-3.5 py-2.5 font-semibold transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                  >
                    <span className="mr-2 inline-block">
                      <svg
                        className="h-6 w-6 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </span>
                    Sign In with Google
                  </button>
                  
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="/signUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
        </div>
    );
};

export default SignIn;