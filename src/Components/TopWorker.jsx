import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Aos from "aos";
import { useEffect } from "react";
import Loader from "./Loader";

const TopWorker = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topWorkers = [], isLoading } = useQuery({
    queryKey: ["top-workers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/sort/by-role");
      return res.data;
    },
  });


  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-white max-w-7xl mx-auto pb-10 mb-10 rounded-2xl py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🏆 Top 6 Workers
        </h2>

        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topWorkers.map((worker) => (
              <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                key={worker._id}
                className="bg-white text-gray-800 rounded-xl shadow-md p-5 flex flex-col items-center"
              >
                <img
                  src={worker.image || "/default-user.png"}
                  alt={worker.name}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <h4 className="text-lg font-semibold">{worker.name}</h4>
                <p className="text-sm text-gray-600">{worker.email}</p>
                <p className="mt-2 text-indigo-600 font-bold">
                  💰 {worker.coin} Coins
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopWorker;
