import { Link, NavLink } from "react-router";
import {
  FaTasks,
  FaPlusCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
} from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../../Components/Navbar";
import AuthUser from "../../../hooks/AuthUser";
import Footer from "../../../Components/Footer";

const BuyerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userData} = AuthUser()

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className=" flex bg-gray-50">
      
      {/* Sidebar */}
      <div
        className={`bg-gray-400 pt-20 text-white w-64 min-h-[calc(100vh-50px)] p-5 space-y-4 fixed md:relative z-40 top-0 left-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Link to="/" className="text-xl font-bold text-blue-600">
          MicroTasker
        </Link>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300 mt-3"
              : "block hover:text-yellow-300 mt-3"
          }
        >
          <FaTachometerAlt className="inline mr-2" />
          Home
        </NavLink>

        {
          userData?.role === 'buyer' ? ( <>
        <NavLink
          to="/dashboard/add-task"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <FaPlusCircle className="inline mr-2" />
          Post New Task
        </NavLink>

        <NavLink
          to="/dashboard/my-tasks"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <FaTasks className="inline mr-2" />
          My Tasks
        </NavLink>
        <NavLink
          to="/dashboard/point-purchase"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Purchase Coin
        </NavLink>


        
        <NavLink
          to="/dashboard/payment-history"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Payment History
        </NavLink>
           </>

          ) : ''
        }

        {
          userData?.role === 'worker' ? (<>
          <NavLink
          to="/dashboard/task-list"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Task List
        </NavLink>
        <NavLink
          to="/dashboard/withdraw"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Withdraw
        </NavLink>
        <NavLink
          to="/dashboard/task-list-by-user"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          My submission task
        </NavLink>
          </>) : ''
        }

        {
          userData?.role === 'admin' ? (<>
          <NavLink
          to="dashboard/all-users"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Manage Users
        </NavLink>
        <NavLink
          to="dashboard/admin-task-list"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-yellow-300"
              : "block hover:text-yellow-300"
          }
        >
          <BiPurchaseTag className="inline mr-2" />
          Manage Tasks
        </NavLink>
          </>) : ''
        }

        
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
      >
        <FaBars size={20} className="text-blue-600" />
      </button>

      {/* Right Side Content */}
      <div className="flex-1 md:ml-40 p-6 pt-20"><Outlet></Outlet></div>
    </div>
    <div>
      <Footer></Footer>
    </div>
    </div>
  );
};

export default BuyerLayout;
