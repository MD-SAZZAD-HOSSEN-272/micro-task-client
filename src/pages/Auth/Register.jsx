import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import signInWithGoogle from "../../hooks/signInWithGoogle";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUpdateImgBB from "../../hooks/useUpdateImgBB";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileExists", "You must upload a file", (value) => value?.length > 0),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "One uppercase letter")
    .matches(/[a-z]/, "One lowercase letter")
    .matches(/[0-9]/, "One number")
    .matches(/[@$!%*?&#]/, "One special character"),
  role: yup.string().required("Role is required"),
});

const Register = () => {
  const { loginWithEmail, refetch } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const signinWithGoogle = signInWithGoogle();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: cerateNewUser } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/users", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        updateCoin(data.insertedId);
      }
    },
  });

  const { mutate: updateCoin } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/user-coin/${id}`);
      return res;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegisterWithEmail = async (data) => {
    const { email, password, image, ...rest } = data;

    const uploadImage = await useUpdateImgBB(image?.[0]);
    data.image = uploadImage;

    loginWithEmail(email, password)
      .then((result) => {
        if (result) {
          cerateNewUser(data);
          navigate("/");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form
        onSubmit={handleSubmit(handleRegisterWithEmail)}
        className="space-y-4"
      >
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            {...register("image")}
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-md"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <select
            className="w-full border px-3 py-2 rounded-md"
            defaultValue=""
            {...register("role")}
          >
            <option value="" disabled>
              Select your Role
            </option>
            <option value="buyer">Buyer</option>
            <option value="worker">Worker</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <button>
        You have already an Account{" "}
        <Link to="/auth/login" className="text-blue-500 underline">
          login
        </Link>
      </button>

      <div className="mt-4 text-center">
        <p>or</p>
        <button
          onClick={signinWithGoogle}
          className="mt-2 w-full border py-2 rounded-md hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
