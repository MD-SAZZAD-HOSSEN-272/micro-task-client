import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthUser from "../../hooks/AuthUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../Components/Loader";

const Withdraw = () => {
  const { user, refetch: userRefetch, loading } = AuthUser();
  const axiosSecure = useAxiosSecure();

  if(loading){
    return <p>loading......</p>
  }
console.log('after loading',user);
  // Let's say coin info is fetched from context or another API
//   const [userCoin, setUserCoin] = useState(0); // Replace this with real coin
  // const [withdrawDollar, setWithdrawDollar] = useState(0);
  // const [canWithdraw, setCanWithdraw] = useState(null)

  

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchedCoin = watch("withdrawal_coin");

  const {data: withdrawUser, refetch, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: async() => {
        const  res = await axiosSecure(`/user?email=${user?.email}`);
        return res.data
    }
  })

  

  console.log(withdrawUser);

  // Auto-update dollar field on coin input
  useEffect(() => {
    const coin = parseInt(watchedCoin) || 0;
    const dollar = (user?.role) === 'worker' ? (coin / 20) : ( coin / 10);
    // setWithdrawDollar(dollar.toFixed(2));
    setValue("withdrawal_amount", dollar.toFixed(2));
    refetch()
  }, [watchedCoin, setValue, refetch]);

  // Mutation to submit withdrawal
  const { mutate: withdrawRequest, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/withdrawals", data);
      return res.data;
    },
    onSuccess: () => {
      alert("Withdrawal Request Submitted!");
      refetch()
      userRefetch()
    },
  });

  const onSubmit = (data) => {
    const submission = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: parseInt(data.withdrawal_coin),
      withdrawal_amount: parseFloat(data.withdrawal_amount),
      payment_system: data.payment_system,
      account_number: data.account_number,
      withdraw_date: new Date(),
      status: "pending",
    };
    withdrawRequest(submission);
    
  };

  // useEffect(() => {
  //   let isTrue = withdrawUser?.coin >= 200
  //   setCanWithdraw(isTrue)
  // }, [])

  let canWithdraw = withdrawUser?.coin >= 200;
  console.log(canWithdraw);

  if(isLoading){
    return <Loader></Loader>
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded p-6 mt-8 space-y-5">
      <h2 className="text-xl font-semibold">Your Earning</h2>
      <p className="text-gray-600">
        🪙 Coin: <strong>{withdrawUser?.coin}</strong>
      </p>
      <p className="text-gray-600">
        💵 Withdrawal Amount: <strong>${(withdrawUser?.coin / 20).toFixed(2)}</strong>
      </p>

      {canWithdraw ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Coin to Withdraw:</label>
            <input
              type="number"
              {...register("withdrawal_coin", {
                required: true,
                min: 20,
                max: withdrawUser.coin,
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.withdrawal_coin && (
              <p className="text-red-500 text-sm">
                Enter valid amount (max: {withdrawUser?.coin})
              </p>
            )}
          </div>

          <div>
            <label>Withdraw Amount ($):</label>
            <input
              type="number"
              {...register("withdrawal_amount")}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label>Select Payment System:</label>
            <select
              {...register("payment_system", { required: true })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="bkash">Bkash</option>
              <option value="rocket">Rocket</option>
              <option value="nagad">Nagad</option>
              <option value="upay">Upay</option>
            </select>
            {errors.payment_system && (
              <p className="text-red-500 text-sm">Select a payment system</p>
            )}
          </div>

          <div>
            <label>Account Number:</label>
            <input
              type="text"
              {...register("account_number", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.account_number && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Withdraw
          </button>
        </form>
      ) : (
        <p className="text-red-600 mt-4 font-medium text-center">
          🚫 Insufficient coin (Minimum 200 coins required)
        </p>
      )}
    </div>
  );
};

export default Withdraw;
