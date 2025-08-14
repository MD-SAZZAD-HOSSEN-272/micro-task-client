import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Load Admin Stats
  const { data: adminStats = {}, refetch: statsRefetch } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    }
  });

  // Load Withdraw Requests
  const { data: withdrawRequests = [], refetch: withdrawRefetch } = useQuery({
    queryKey: ["withdraw-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdrawals?status=pending");
      return res.data;
    }
  });

  const handlePaymentSuccess = async (request) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Confirm payment of ${request.withdrawal_coin} coins to ${request.worker_email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/withdrawals/approve/${request._id}`, {
          email: request.worker_email,
          coin: request.withdrawal_coin,
          status: 'approved'
        });
        if (res.data?.modifiedCount || res.data?.updated) {
          Swal.fire("Success", "Payment marked as successful.", "success");
          withdrawRefetch();
          statsRefetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to approve withdrawal.", "error");
      }
    }
  };

  return (
    <div className="p-4 space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Workers</h2>
          <p className="text-3xl">{adminStats.totalWorkers}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Buyers</h2>
          <p className="text-3xl">{adminStats.totalBuyers}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Available Coin</h2>
          <p className="text-3xl">{adminStats.totalCoin}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Payments</h2>
          <p className="text-3xl">${adminStats.totalPayments}</p>
        </div>
      </div>

      {/* Withdraw Request Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pending Withdraw Requests</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>Worker Email</th>
                <th>Coin</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td>{req.worker_email}</td>
                  <td>{req.withdrawal_coin}</td>
                  <td className="capitalize">{req.status}</td>
                  <td>
                    <button
                      onClick={() => handlePaymentSuccess(req)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Payment Success
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {withdrawRequests.length === 0 && <p className="text-center py-4">No pending withdrawal requests.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
