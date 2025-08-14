import React from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const TaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = AuthUser()

  // Fetch task details
  const { data: task, isLoading, error } = useQuery({
    queryKey: ["task-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/worker/${id}`);
      return res.data;
    },
  });
  
  console.log(task);
  // Form hook
  const { register, handleSubmit, reset } = useForm();

  // Submit mutation
  const { mutate: submitTask, isPending } = useMutation({
    mutationFn: async (submissionData) => {
        console.log(submissionData);
      const res = await axiosSecure.post("/task-submission", submissionData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Task submitted successfully!", "success");
      reset();
    },
    onError: () => {
      Swal.fire("Error", "Failed to submit task.", "error");
    },
  });

  const onSubmit = (data) => {
    const submissionPayload = {
      taskId: id,
      worker_email: user?.email,
      worker_name: user?.displayName,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      task_image: task.task_image_url,
      status: 'pending',
      submission_details: data.submission_details,
      submittedAt: new Date(),
    };
    submitTask(submissionPayload);
  };

  if (isLoading) return <Loader></Loader>;
  if (error) return <p className="text-center text-red-500">Error loading task</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="border rounded-lg shadow p-6 bg-white">
        <img
          src={task.task_image_url}
          alt="Task"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{task.task_title}</h2>
        <p className="text-gray-700 mt-2">
          <strong>Details:</strong> {task.task_detail}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Workers Needed:</strong> {task.required_workers}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Pay per Worker:</strong> ${task.payable_amount}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Deadline:</strong> {task.completion_date}
        </p>
        <p className="text-gray-700 mt-1">
          <strong>Submission Info:</strong> {task.submission_info}
        </p>
      </div>

      {/* Submission Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Submit Your Work</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register("submission_details", { required: true })}
            className="w-full border rounded p-2 h-32"
            placeholder="Enter your submission details..."
          ></textarea>
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isPending ? "Submitting..." : "Submit Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
