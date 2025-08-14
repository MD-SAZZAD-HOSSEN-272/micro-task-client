import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {loading} = AuthUser()

  if(loading) {
    return <p>loading.............</p>
  }

  // Fetch all tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["available-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/task/worker");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={task.task_image_url}
            alt="Task"
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{task.task_title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Pay:</strong> ${task.payable_amount}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Workers Needed:</strong> {task.required_workers}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Deadline:</strong> {task.completion_date}
          </p>
          <button
            onClick={() => navigate(`/dashboard/task-details/${task._id}`)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
