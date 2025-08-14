import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const WorkerDashboardHome = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();

  // Load Worker Stats
  const { data: workerStats = {}, isLoading } = useQuery({
    queryKey: ["worker-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker-stats?email=${user?.email}`);
      return res.data;
    }
  });

  // Load Approved Submissions
  const { data: approvedSubmissions = [] } = useQuery({
    queryKey: ["approved-submissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-submissions?email=${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-4 space-y-10">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Submissions</h2>
          <p className="text-3xl">{workerStats.totalSubmissions}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Pending Submissions</h2>
          <p className="text-3xl">{workerStats.pendingSubmissions}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Earnings</h2>
          <p className="text-3xl">${workerStats.totalEarnings}</p>
        </div>
      </div>

      {/* Approved Submission Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Approved Submissions</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>Task Title</th>
                <th>Payable ($)</th>
                <th>Buyer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-100">
                  <td>{submission.task_title}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{submission.buyer_name}</td>
                  <td className="text-green-600 font-semibold capitalize">{submission.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {approvedSubmissions.length === 0 && <p className="text-center py-4">No approved submissions yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboardHome;
