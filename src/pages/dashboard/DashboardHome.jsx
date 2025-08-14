import AuthUser from "../../hooks/AuthUser";
import AdminDashboardHome from "./AdminDashboard/AdminDashboardHome";
import BuyerDashboardHome from "./buyerDashboard/BuyerDashboardHome";
import BuyerTasks from "./buyerDashboard/BuyerTasks";
import WorkerDashboardHome from "./WorkerDashboard/WorkerDashboardHome";



const DashboardHome = () => {
  const {userData} = AuthUser()
  return (
    <div>
      {
        userData?.role === 'buyer' ? <>
        <BuyerDashboardHome></BuyerDashboardHome>
      <BuyerTasks></BuyerTasks>
        </> : ''
      }
      {
        userData?.role === 'worker' ? <>
        <WorkerDashboardHome></WorkerDashboardHome>
        </>: ''
      }
      {
        userData?.role === 'admin' && <AdminDashboardHome></AdminDashboardHome>
      }
      
    </div>
  );
};

export default DashboardHome;