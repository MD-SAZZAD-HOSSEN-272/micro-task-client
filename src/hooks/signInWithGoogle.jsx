import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const signInWithGoogle = () => {
  const { loginWithGoogle, refetch } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { mutate: cerateNewUser, isSuccess } = useMutation({
    mutationFn: async (data) => {
      
      const res = await axiosSecure.post("/users", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data && data?.insertedId) {
        navigate("/select-role");
        updateCoin(data?.insertedId);
      }
    },
  });

  const { mutate: updateCoin } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/user-coin/${id}`);
      return res;
    },
  });

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then((result) => {
        if (result?.user) {
          const user = result?.user;
          const userInfo = {
            name: user?.displayName,
            email: user?.email,
            role: "buyer",
          };
          cerateNewUser(userInfo);
          refetch();
          navigate("/");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          
          console.log(cerateNewUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return handleLoginWithGoogle;
};

export default signInWithGoogle;
