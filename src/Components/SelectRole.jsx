import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AuthUser from "../hooks/AuthUser";
import { useNavigate } from "react-router";

const SelectRole = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure()
  const {user, refetch} = AuthUser()
  const navigate = useNavigate()

    const {mutate: updateRole} = useMutation({
        mutationFn: async(data) => {
            const res = await axiosSecure.patch('/user', {role: data.role, email: user?.email})
            return res.data
        },
        onSuccess: (data) => {
            console.log('onsuccess',data);
            
        }
    })
    


  const handleRole = (data) => {
    console.log(data);
    updateRole(data)
    navigate('/')
    refetch()
  };

  return (
    <div className="w-4/12 bg-amber-600 p-5 rounded-2xl mx-auto mt-28">
      <form onSubmit={handleSubmit(handleRole)}>
        <select
          className="w-full border px-3 py-2 rounded-md"
          defaultValue=""
          required
          {...register("role", { require: true })}
        >
          <option value="" disabled>
            Select your Role
          </option>
          <option value="buyer">Buyer</option>
          <option value="worker">Worker</option>
        </select>
        <input
          type="submit"
          value="confirm"
          className="px-2 py-1 rounded-xl border mt-5"
        />
      </form>
    </div>
  );
};

export default SelectRole;
