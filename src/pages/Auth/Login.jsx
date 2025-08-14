import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import signInWithGoogle from "../../hooks/signInWithGoogle";
import { useForm } from "react-hook-form";
import AuthUser from "../../hooks/AuthUser";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithEmail, refetch } = AuthUser();
  const signinWithGoogle = signInWithGoogle();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // const { mutate: cerateNewUser } = useMutation({
  //   mutationFn: async (data) => {
  //     const res = await axiosSecure.post("/users", data);
  //     return res.data;
  //   },
  //   onSuccess: (data) => {
  //     if (data.insertedId) {
  //       console.log(data.insertedId);
  //       updateCoin(data.insertedId);
  //     }
  //   },
  // });

  // const { mutate: updateCoin } = useMutation({
  //   mutationFn: async (id) => {
  //     console.log(id);
  //     const res = await axiosSecure.patch(`/user-coin/${id}`);
  //     return res
  //   },
  // });
  const handleSignIn = (data) => {
    const { email, password } = data;
    console.log(email, password);
    setError("");
    signInWithEmail(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      })
      .catch((err) => {
        // console.log(err.message);
        setError("incorrect Password or Email");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">LogIn</h2>

      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <input
          type="email"
          {...register("email", { require: true })}
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          {...register("password", { require: true })}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <span className="text-red-600">{error}</span>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <button>
        You have not an Account{" "}
        <Link to="/auth/register" className="text-blue-500 underline">
          register
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

export default Login;
