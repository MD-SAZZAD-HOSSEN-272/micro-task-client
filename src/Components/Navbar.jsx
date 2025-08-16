import { Link, NavLink, useNavigate } from "react-router";
import AuthUser from "../hooks/AuthUser";
import NotificationPopUp from "./NotificationPopUp";
import { useState } from "react";
import Swal from "sweetalert2";
import { CiMenuBurger } from "react-icons/ci";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const { user, logout, userData } = AuthUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  console.log(dropdownOpen);
  const handleSignOut = () => {
    logout()
      .then(() => {
        console.log("logout successfully");
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="w-full top-0 z-50 fixed backdrop-blur-lg bg-white/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 hidden md:flex">
          MicroTasker
        </Link>
        <div className="md:hidden"></div>

        <div className="flex items-center gap-4">
          {/* Show on medium and up */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                
                <span>{userData?.role}</span>
                <div className="relative">
                  <span className="text-green-600 font-semibold">
                    Coin {userData?.coin || 0}
                  </span>
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1 rounded-full animate-bounce">
                    New
                  </span>
                </div>
                <p>{userData?.name}</p>
                <div>
                  <NavLink to="/dashboard" className={({isActive}) => `ml-4 cursor-pointer border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white ${isActive ? 'bg-blue-600 text-white' : ''}`}>
                  Dashboard
                </NavLink>
                <button onClick={handleSignOut} className="ml-4 cursor-pointer border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white">
                  LogOut
                </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth/register">
                  <button className="ml-4 cursor-pointer border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white">Register</button>
                </Link>
                <Link to="/auth/login">
                  <button className="ml-4 cursor-pointer border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white">Login</button>
                </Link>
              </>
            )}
            <Link to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MD-SAZZAD-HOSSEN-272">
              <button className="ml-4 cursor-pointer border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white">Join as Developer</button>
            </Link>
          </div>

          {/* User Image and Dropdown for Small Devices */}
          {user ? (
            <div className="relative md:hidden">
              <img
                className="w-10 h-10 rounded-full cursor-pointer border"
                src={userData?.image}
                alt="User"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 p-4 space-y-2">
                  
                  <p className="text-sm">{userData?.role}</p>
                  <div className="relative">
                    <span className="text-green-600 font-semibold">
                      Coin {userData?.coin || 0}
                    </span>
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1 rounded-full animate-bounce">
                      New
                    </span>
                  </div>
                  <p className="text-sm">{userData?.name}</p>
                  <Link
                    to="/dashboard"
                    className="block text-sm hover:underline border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-sm text-red-600 border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white"
                  >
                    Logout
                  </button>
                  <Link
                    to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MD-SAZZAD-HOSSEN-272"
                    className="text-sm block border border-blue-600 py-2 px-3 rounded-xl hover:bg-blue-600 hover:text-white"
                  >
                    Join as Developer
                  </Link>
                  
                </div>
              )}
            </div>
          ) :
          <div className="relative md:hidden">
            <button className="ml-4 cursor-pointer ">
              <CiMenuBurger onClick={() => setDropdownOpen(!dropdownOpen)} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 p-4 space-y-2">
                <Link
                  to="/auth/register"
                  className="block text-sm hover:underline"
                >
                  <button className="ml-4 cursor-pointer">Register</button>
                </Link>
                <Link
                  to="/auth/login"
                  className="block text-sm hover:underline"
                >
                  <button className="ml-4 cursor-pointer">Login</button>
                </Link>
                <Link
                  className="block text-sm hover:underline"
                  to="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MD-SAZZAD-HOSSEN-272"
                >
                  <button className="ml-4 cursor-pointer">
                    Join as Developer
                  </button>
                </Link>
              </div>
            )}
          </div> }
          <NotificationPopUp />
          <DarkMode></DarkMode>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
