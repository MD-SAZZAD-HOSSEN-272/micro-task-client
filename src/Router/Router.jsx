import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import BuyerDashboard from "../pages/dashboard/buyerDashboard/BuyerDashboard";
import AddTask from "../pages/dashboard/buyerDashboard/AddTask";
import SelectRole from "../Components/SelectRole";
import CoinPurchaseCards from "../pages/dashboard/buyerDashboard/CoinPurchaseCards";
import Payment from "../pages/Payment/Payment";
import MyTask from "../pages/dashboard/buyerDashboard/MyTask";
import AllUsers from "../pages/dashboard/AdminDashboard/AllUsers";
import AdminTaskList from "../pages/dashboard/AdminDashboard/AdminTaskList";
import TaskList from "../pages/dashboard/WorkerDashboard/TaskList";
import TaskDetails from "../pages/dashboard/WorkerDashboard/TaskDetails";
import WorkerTaskList from "../pages/dashboard/WorkerDashboard/WorkerTaskList";
import Withdraw from "../pages/dashboard/Withdraw";
import WorkerRoute from "./WorkerRoute";
import BuyerRoute from "./BuyerRoute";
import PaymentHistory from "../pages/dashboard/buyerDashboard/paymentHistory";
import PrivetRoute from "./PrivetRoute";
import AdminRouter from "./AdminRouter";
import DashboardHome from "../pages/dashboard/DashboardHome";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'payment/:id',
        element: <PrivetRoute><Payment></Payment></PrivetRoute>
      }
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      
    ],
  },
  {
    path: "dashboard",
    Component: BuyerDashboard,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "/dashboard/add-task",
        element: <BuyerRoute><AddTask></AddTask></BuyerRoute>
      },
      {
        path: "/dashboard/my-tasks",
        element: <BuyerRoute><MyTask></MyTask></BuyerRoute>
      },

      // share route
      {
        path: '/dashboard/point-purchase',
        element: <PrivetRoute><CoinPurchaseCards></CoinPurchaseCards></PrivetRoute>
      },
      {
        path: '/dashboard/payment-history',
        element: <PrivetRoute><PaymentHistory></PaymentHistory></PrivetRoute>
      },


      // only see admin
      {
        path: 'dashboard/all-users',
        element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
      },
      {
        path: 'dashboard/admin-task-list',
        element: <AdminRouter><AdminTaskList></AdminTaskList></AdminRouter>
      },

      // only see worker
      {
        path: '/dashboard/task-list',
        element: <WorkerRoute><TaskList></TaskList></WorkerRoute>
      },
      {
        path: '/dashboard/task-details/:id',
        element: <WorkerRoute><TaskDetails></TaskDetails></WorkerRoute>
      },
      {
        path: '/dashboard/task-list-by-user',
        element: <WorkerRoute><WorkerTaskList></WorkerTaskList></WorkerRoute>
      },


      // withdraw 
      {
        path: '/dashboard/withdraw',
        element: <WorkerRoute><Withdraw></Withdraw></WorkerRoute>
      }
    ],
  },
  {
    path: "/select-role",
    Component: SelectRole,
  },
]);

export default Router;
