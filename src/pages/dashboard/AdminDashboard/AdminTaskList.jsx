import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../Components/Loader";

const AdminTaskList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["admin-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks_admin");
      return res.data;
    },
  });

  // Mutation for deleting a task
  const { mutate: deleteTask } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/tasks/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-tasks"]);
      Swal.fire("Deleted!", "Task has been deleted.", "success");
    },
  });

  // Handle Delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
      <table className="table w-full border">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Payable</th>
            <th>Workers</th>
            <th>Deadline</th>
            <th>Submission Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                <img
                  src={task.task_image_url}
                  alt="task"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{task.task_title}</td>
              <td>${task.payable_amount}</td>
              <td>{task.required_workers}</td>
              <td>{task.completion_date}</td>
              <td>{task.submission_info}</td>
              <td>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTaskList;
