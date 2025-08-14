import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CoinPurchaseCards = () => {
  const axiosSecure = useAxiosSecure()
  const {data:packages} = useQuery({
    queryKey: ['package'],
    queryFn: async() => {
        const res = await axiosSecure.get('/package');
        return res.data
    }
  })

  console.log(packages);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Buy Coins</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages?.map((pkg, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
          >
            <FaCoins className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">{pkg.coins} Coins</h3>
            <p className="text-gray-500 mb-4">= ${pkg.price}</p>
            <Link to={`/payment/${pkg?._id}`}>
              <button className="mt-auto cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinPurchaseCards;
