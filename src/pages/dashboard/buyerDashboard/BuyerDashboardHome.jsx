import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const BuyerDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { userData: user } = AuthUser();

  const { data: buyerStats = {}, isLoading } = useQuery({
    queryKey: ["buyer-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-stats?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  console.log(buyerStats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="bg-blue-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Total Tasks</h2>
        <p className="text-3xl">{buyerStats.totalTasks}</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Pending Workers</h2>
        <p className="text-3xl">{buyerStats.pendingWorkers}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Total Paid</h2>
        <p className="text-3xl">${buyerStats.totalPaid}</p>
      </div>
    </div>
  );
};

export default BuyerDashboardHome;
