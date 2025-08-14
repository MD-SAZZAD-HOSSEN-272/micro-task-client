import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser()

  // 🔽 State for filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔽 Fetch all data
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(payments);

  // 🔽 Filtered payment data
  const filteredPayments = payments.filter((payment) => {
    const amount = payment.amount || 0;
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    return amount >= min && amount <= max;
  });

  if (isLoading) return <Loader></Loader>;
  if (isError) return <p className="text-center text-red-500">Failed to load payment history.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">💳 Payment History</h2>

      {/* 🔍 Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <div>
          <label className="block text-sm">Min Price ($)</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 10"
            className="border px-3 py-1 rounded w-32"
          />
        </div>
        <div>
          <label className="block text-sm">Max Price ($)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 50"
            className="border px-3 py-1 rounded w-32"
          />
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <p className="text-center text-gray-600">No payment records match your filter.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Amount ($)</th>
                <th className="px-4 py-2 text-left">Coins</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Payment Method</th>
                <th className="px-4 py-2 text-left">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">${payment.amount}</td>
                  <td className="px-4 py-2">{payment.coins || "N/A"}</td>
                  <td className="px-4 py-2 text-xs text-blue-600 break-all">{payment.transactionId}</td>
                  <td className="px-4 py-2 capitalize">
                    {Array.isArray(payment.paymentMethod)
                      ? payment.paymentMethod.join(", ")
                      : payment.paymentMethod}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(payment.paidAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
