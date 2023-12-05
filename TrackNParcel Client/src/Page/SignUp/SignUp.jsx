import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const SignUp = () => {
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic()
  const { user, createUser, profileUpdate, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogle = () => {
    const toastId = toast.loading("Sign In Successful");
    googleLogin()
      .then((result) => {
        const userDetails = {
            name : result.user?.displayName,
            email : result.user?.email,
            photo : result.user?.photoURL,
            type : "user",
            phone : 9549343000
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
        console.log(error);
      });
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
   
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: data.name,
            photoURL: data.photo,
          })
            .then((result) => {
              
              console.log("updateProfile");

              const userDetails = {
                name : data.name,
                email : data.email,
                photo : data.photo,
                type : data.type,
                phone : data.phone
              }
              const toastId = toast.loading("Account Created Successfully");
              axiosPublic.post("/users", userDetails)
              .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    toast.success("Account Created Successfully", { id: toastId });
                    navigate("/")
                }
                
              })
              
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <section class=" pt-10  w-full">
        <div class="flex flex-col items-center py-20 justify-center px-6  mx-auto md:h-screen lg:py-0 w-[100%] lg:w-[90%]">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center dark:text-white">
                Create Your Account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                class="space-y-4 md:space-y-6"
              >
                <div className=" flex lg:gap-0 gap-5 justify-between lg:flex-row flex-col lg:items-center">
                  <div>
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Name
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {errors.name && (
                      <span className="py-3 text-red-500">
                        name is required
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                    {errors.email && (
                      <span className="py-3 text-red-500">
                        email is required
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div></div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password?.type === "minLength" && (
                    <p className=" text-red-500 pt-2">
                      password must be 6 character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className=" text-red-500 pt-2">
                      password must be less than 20 character
                    </p>
                  )}
                  {errors.password?.type === "required" && (
                    <p className=" text-red-500 pt-2">password is required </p>
                  )}

                  {errors.password?.type === "pattern" && (
                    <p className=" text-red-500 pt-2">
                      password must have one lower case one upper case one
                      number and one special character{" "}
                    </p>
                  )}
                </div>
                <div className=" flex lg:gap-0 gap-5 justify-between lg:flex-row flex-col lg:items-center">
                  <div>
                  <label
                    for="photo"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Photo URL
                  </label>
                  <input
                    {...register("photo", { required: true })}
                    type="text"
                    name="photo"
                    id="photo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="type your photo url "
                  />
                  {errors.photo?.type === "required" && (
                    <p className=" text-red-500 pt-2">photo url is required </p>
                  )}
                  </div>
                  <div>
                  <label
                    for="photo"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    type="number"
                    name="phone"
                    id="photo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="type your number  "
                  />
                  {errors.phone?.type === "required" && (
                    <p className=" text-red-500 pt-2">phone number is required </p>
                  )}
                  </div>
                  
                </div>
                <div>
                  <label
                    for="type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    {...register("type", { required: true})}
                    id="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected>Choose a user type</option>
                    <option value="user">User</option>
                    <option value="deliveryMen">Delivery Man</option>
                  </select>
                </div>

                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <div className=" flex items-center w-full gap-4">
                  <div className=" border w-56 border-gray-300"></div>
                  <div>or</div>
                  <div className=" border w-56 border-gray-300"></div>
                </div>

                <div className=" space-y-2 lg:py-1">
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
                  <p class="text-sm font-light text-gray-700 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/signIn"
                      class="font-medium text-gray-800 hover:underline dark:text-primary-500"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
