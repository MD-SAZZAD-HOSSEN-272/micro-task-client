import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const LIMIT = 6; // items per page

const WorkerTaskList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-submissions", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/task-submission?email=${user?.email}&page=${page}&limit=${LIMIT}`
      );
      return res.data; // { total, data }
    },
    enabled: !!user?.email,
  });

  const submissions = data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT);

  console.log(data, total, totalPages);

  if (isLoading) return <Loader></Loader>;
  if (error) return <p className="text-center text-red-500">Failed to load submissions.</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.length === 0 ? (
          <p className="text-center col-span-full">No submissions found.</p>
        ) : (
          submissions.map((submission) => (
            <div key={submission._id} className="bg-white shadow-md rounded-lg p-4 border">
              <p className="text-gray-700 mb-2 border border-gray-600 px-3 py-1 rounded-xl w-fit"> <strong>Status:</strong> {submission.status}</p>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Task ID: {submission.taskId}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Submitted At:</strong>{" "}
                {new Date(submission.submittedAt).toLocaleString()}
              </p> 
              
              <p className="text-gray-700">
                <strong>Details:</strong> {submission.submission_details}
              </p>
            </div>
          ))
        )}
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                i + 1 === page ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkerTaskList;
