import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  UserMinusIcon,
  UserIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import img from "./box2.png";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Card,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MdNotifications } from "react-icons/md";
import Container from "../../Component/Container/Container";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hook/useAdmin";
export default function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logOut } = useContext(AuthContext);

  const [isAdmin] = useAdmin()

  const userName = user?.displayName;
  const handleLogOut = () => {
    const toastId = toast.loading("Sign Out Successfully");
    logOut()
      .then((result) => {
        toast.success("Sign Out Successfully", { id: toastId });
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const profileMenuItems = [
    {
      label: userName,
      icon: UserIcon,
    },
    {
      label: "Dashboard",
      link: isAdmin ? "/dashboard/adminHome" : "/dashboard", // Add the link to your dashboard route
      icon: CubeIcon,
    },
    {
      label: "Logout",
      onClick: () => handleLogOut(),
      icon: PowerIcon,
    },
  ];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <div
            
            className="flex active:bg-green-200 flex-row cursor-pointer justify-center items-center gap-1 rounded-full py-1 pr-6 pl-1 lg:ml-auto"
          >  
          <div>
          <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={user?.email ? user?.photoURL : ""}
            />
          </div>
            
            <div className=" -mr-5"> 
              <ChevronDownIcon
              strokeWidth={3}
              className={`h-3 w-3 text-gray-800 font-bold transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
            </div>
            
          </div>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, onClick, link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  if (link) {
                    closeMenu();
                  } else {
                    onClick();
                    closeMenu();
                  }
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {link ? (
                  <Link to={link} className="flex items-center gap-2">
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </Link>
                ) : (
                  <>
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </>
                )}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center ${
              isActive
                ? " text-green-600 underline decoration-2 underline-offset-8 font-bold"
                : "text-gray-900 font-semibold"
            }`
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center ${
              isActive
                ? " text-green-600 underline decoration-2 underline-offset-8 font-bold"
                : "text-gray-900 font-semibold"
            }`
          }
        >
          About
        </NavLink>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/service"
          className="flex items-center text-gray-900 font-semibold"
        >
          Service
        </NavLink>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center ${
              isActive
                ? " text-green-600 underline decoration-2 underline-offset-8 font-bold"
                : "text-gray-900 font-semibold"
            }`
          }
        >
          Contact Us
        </NavLink>
        
      </Typography>
    </ul>
  );

  return (
    <div className="">
      <Navbar className="fixed px-4 max-w-8xl lg:px-24 mx-auto bg-white z-10 rounded-none py-4 lg:py-5 shadow-none border-b border-b-gray-300">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className=" flex items-center gap-2">
            <img className="w-[40px]" src={img} alt="" />
            <h2 className="mr-4 text-2xl font-bold cursor-pointer">
              TrackNParcel
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-2 hidden lg:block">{navList}</div>
            <span className="text-xl lg:text-2xl">
          <MdNotifications />
        </span>
            <div className="flex items-center gap-x-1">
              {user?.email && <ProfileMenu />}
              {user?.email ? (
                ""
              ) : (
                <Link to="/signIn">
                  <button
                    variant="text"
                    size="md"
                    className="hidden bg-green-700 px-4 py-1.5 text-white rounded-md hover:rounded-full ease-in-out transition-all duration-150 lg:inline-block"
                  >
                    <span>Login</span>
                  </button>
                </Link>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto hover:bg-gray-100 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 rounded-full"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav className=" " open={openNav}>
          {navList}
          
          <div className="flex w-full items-center gap-x-1 ">
          
            {user?.email || (
              <Link to="/signIn">
                <button
                  fullWidth
                  variant="text"
                  size="sm"
                  className="bg-green-700 text-white py-1.5 w-full px-4 rounded-md"
                >
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
