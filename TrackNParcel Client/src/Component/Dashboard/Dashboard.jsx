import React, { useContext, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdReviews } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoStatsChart } from "react-icons/io5";
import {
  FaBlog,
  FaBlogger,
  FaBloggerB,
  FaBook,
  FaBookOpen,
  FaBox,
  FaBoxOpen,
  FaHome,
  FaList,
  FaPhone,
  FaPhoneAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCheck,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Hook/useAdmin";
import useDelivery from "../../Hook/useDelivery";
const Dashboard = () => {
 
  const [open, setOpen] = useState(true);
  const axiosSecure = useAxiosSecure();

  const {user, logOut} = useContext(AuthContext)

  const navigate = useNavigate()

  const [isAdmin] = useAdmin()
  const [isDelivery] = useDelivery()
  console.log(isDelivery)
  const { data: type = [], refetch } = useQuery({
    queryKey: ["type"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });

  const handleLogOut = () => {

    logOut()
    .then(() => {
      console.log("logout successful")
      navigate("/")
    })
  }

  
 
  return (
    <div className=" overflow-x-auto">
      <section className="flex gap-6">
      <div
        className={`bg-[#0f172a]  min-h-screen ${
          open ? "w-72 fixed z-50 " : "w-16"
        } duration-500 text-gray-500 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {/* {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-100 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))} */}

          <nav>
            {isAdmin && (
              <ul>
                <li class="flex gap-3 items-center px-2 py-2  text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                  <IoStatsChart />
                  </span>

                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/adminHome">Statistics</NavLink>
                  )}
                </li>
                <li class="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaBox></FaBox>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/allParcel">All Parcel</NavLink>
                  )}
                </li>
                <li class="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaUser></FaUser>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/allUser">All User</NavLink>
                  )}
                </li>
                <li class="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaUsers></FaUsers>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/allDeliveryMen">
                      All Delivery Man
                    </NavLink>
                  )}
                </li>
                <hr class="my-6 border-gray-200 " />
              </ul>
            )}

           

            {!isAdmin && !isDelivery && (
              <ul>
                <li class="flex gap-3 items-center px-2 py-2 text-gray-500  rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaUserEdit></FaUserEdit>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/myProfile">My Profile</NavLink>
                  )}
                </li>
                <li class="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaBoxOpen></FaBoxOpen>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/bookParcel">Book a Parcel</NavLink>
                  )}
                </li>
                <li class="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaBox></FaBox>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/myParcel">My Parcel</NavLink>
                  )}
                </li>
              </ul>
            )}

            
            {isDelivery && (
              <ul>
                <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <FaList></FaList>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/deliveryList">
                      My Delivery List
                    </NavLink>
                  )}
                </li>
                <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-500 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800 ">
                  <span>
                    <MdReviews></MdReviews>
                  </span>
                  {!open ? (
                    ""
                  ) : (
                    <NavLink to="/dashboard/myReview">My Review</NavLink>
                  )}
                </li>
                <hr class="my-6 border-gray-200 " />
              </ul>
            )}
           

            <ul>
              <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800">
                <FaHome></FaHome>
                {!open ? (
                    ""
                  ) : (
                    <NavLink to="/">Home</NavLink>
                  )}
              </li>
              <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800">
                <FaBookOpen></FaBookOpen>
                {!open ? (
                    ""
                  ) : (
                    <NavLink to="/">About</NavLink>
                  )}
              </li>
              <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800">
                <FaPhoneAlt></FaPhoneAlt>
                {!open ? (
                    ""
                  ) : (
                    <NavLink to="/contact">Contact Us</NavLink>
                  )}
              </li>
              <li className="flex gap-3 items-center px-2 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-gray-200 hover:text-gray-800">
                <FaSignOutAlt />
                {!open ? (
                    ""
                  ) : (
                    <button className=" hover:text-gray-800 rounded-md   text-white" onClick={handleLogOut}  >Logout</button>
                  )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={`${open ? "px-6  " : ""} flex-1`}>
       <Outlet></Outlet>
        
      </div>
    </section>
    </div>
    
  );
};

export default Dashboard;
