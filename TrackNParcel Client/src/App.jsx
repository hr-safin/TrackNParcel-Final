import MainLayout from "./Layout/MainLayout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Page/Home/Home";
import SignIn from "./Page/SignIn/SignIn";
import SignUp from "./Page/SignUp/SignUp";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import AboutUs from "./Page/About/AboutUs";
import Contact from "./Page/ContactUs/Contact";
import Dashboard from "./Component/Dashboard/Dashboard";
import PrivateRouter from "./Privaterouter/PrivateRouter";
import AllUser from "./Admin/AllUser";
import BookParcel from "./User/BookParcel";
import MyProfile from "./User/MyProfile";
import MyParcel from "./User/MyParcel";
import UpdateParcel from "./User/UpdateParcel";

import AllParcel from "./Admin/AllParcel";
import AllDeliveryMan from "./Admin/AllDeliveryMan";
import AdminHome from "./Admin/AdminHome";
import MyDeliveryList from "./DeliveryMan/MyDeliveryList";

import Payment from "./Payment/Payment";
import PaymentSuccess from "./Payment/PaymentSuccess";
import MyReview from "./DeliveryMan/MyReview";
import Error from "./Error/Error";

const queryClient = new QueryClient()
function App() {

  const router = new createBrowserRouter([
    {
      path : "/",
      element : <MainLayout />,
      errorElement : <Error />,
      children : [
        {
          path : "/",
          element : <Home />
        },
        {
          path : "/about",
          element : <AboutUs />
        },
        {
          path : "/contact",
          element : <Contact />
        },
        {
          path : "/signIn",
          element : <SignIn/>
        },
        {
          path : "/signUp",
          element : <SignUp />
        }
      ]
    },
    {
      path : "/dashboard",
      element : <PrivateRouter><Dashboard /></PrivateRouter>,
      errorElement : <Error />,
      children : [

        //normal user
        {
          path : "/dashboard/bookParcel",
          element : <BookParcel />
        },
        {
          path : "/dashboard/myProfile",
          element : <MyProfile />
        },
        {
            path : "/dashboard/myParcel",
            element : <MyParcel />
        },
        {
            path : "/dashboard/payment/:id",
            element : <Payment />
        },
        {
            path : "/dashboard/paymentSuccess",
            element : <PaymentSuccess />
        },
        {
            path : "/dashboard/updateParcel/:id",
            element : <UpdateParcel />,
            loader : ({params}) => fetch(`https://server-swift.vercel.app/users/parcels/${params.id}`)
        },
        // admin
        {
          path : "/dashboard/adminHome",
          element : <AdminHome />
        },
        {
          path : "/dashboard/allUser",
          element : <AllUser />
        },
        {
          path : "/dashboard/allParcel",
          element : <AllParcel />
        },
        {
          path : "/dashboard/allDeliveryMen",
          element : <AllDeliveryMan />
        },
        // delivery
        {
           path : "/dashboard/deliveryList",
           element : <MyDeliveryList />
        },
        {
           path : "/dashboard/myReview",
           element : <MyReview />
        },
      ]
    }
  ])
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster />
    </QueryClientProvider>
    
    </>
    
  )
}

export default App
