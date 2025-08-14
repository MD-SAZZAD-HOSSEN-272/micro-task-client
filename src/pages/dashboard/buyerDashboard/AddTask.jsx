import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // ✅ THIS FIXES THE ERROR
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import { use, useEffect } from "react";
import useUpdateImgBB from "../../../hooks/useUpdateImgBB";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  task_title: yup.string().required(),
  task_detail: yup.string().required(),
  required_workers: yup.number().typeError("Must be a number").required(),
  payable_amount: yup.number().typeError("Must be a number").required(),
  completion_date: yup.string().required(),
  submission_info: yup.string().required(),
  task_image_url: yup
    .mixed()
    .test(
      "required",
      "Image is required",
      (value) => value && value.length > 0
    ),
});

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const axiosSecure = useAxiosSecure();
  const { user, userData } = AuthUser();

  // ⬇️ useMutation directly (no custom hook)
  const {
    mutate: createTask,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async (taskData) => {
      console.log(taskData);
      const res = await axiosSecure.post(`/tasks`, taskData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      reset(); 
    },
  });

  const onSubmit = async (data) => {
    data.buyer_name = user?.displayName;
    data.buyer_email = user?.email;
    data.status = "pending";
    data.total_payable_amount = data.payable_amount * data.required_workers;
    const imageURl = await useUpdateImgBB(data.task_image_url?.[0]);
    data.task_image_url = imageURl;
    if (data.total_payable_amount < userData?.coin) {
      console.log(data, userData.coin);
      createTask(data);
    } else {
      alert("Not Available Coin");
    }
    console.log(data, userData);
  };

  return (
    <div className=" mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Post a Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-wrap gap-5 justify-center items-center">
        <input
          {...register("task_title")}
          placeholder="Task Title"
          className="input"
        />
        {errors.task_title && (
          <p className="text-red-500">{errors.task_title.message}</p>
        )}

        <textarea
          {...register("task_detail")}
          placeholder="Task Detail"
          className="input"
        />
        {errors.task_detail && (
          <p className="text-red-500">{errors.task_detail.message}</p>
        )}

        <input
          {...register("required_workers")}
          placeholder="Required Workers"
          className="input"
        />
        {errors.required_workers && (
          <p className="text-red-500">{errors.required_workers.message}</p>
        )}

        <input
          {...register("payable_amount")}
          placeholder="Payable Amount"
          className="input"
        />
        {errors.payable_amount && (
          <p className="text-red-500">{errors.payable_amount.message}</p>
        )}

        <input type="date" {...register("completion_date")} className="input" />
        {errors.completion_date && (
          <p className="text-red-500">{errors.completion_date.message}</p>
        )}

        <input
          {...register("submission_info")}
          placeholder="Submission Info"
          className="input"
        />
        {errors.submission_info && (
          <p className="text-red-500">{errors.submission_info.message}</p>
        )}

        <input
          {...register("task_image_url")}
          placeholder="Upload Image"
          className="input"
          type="file"
          accept="image/*"
        />
        {errors.task_image_url && (
          <p className="text-red-500">{errors.task_image_url.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        >
          {isPending ? "Posting..." : "Post Task"}
        </button>

        {isSuccess && (
          <p className="text-green-500 text-center">
            ✅ Task posted successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-500 text-center">❌ {error.message}</p>
        )}
      </form>
    </div>
  );
};

export default AddTask;
