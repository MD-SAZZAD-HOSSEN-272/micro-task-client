import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../Components/Loader';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showData, setShowData] = useState(false)
  const [allUser, setAllUser] = useState([])

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  useEffect(() => {
    const data = users.slice(0, 5)
    if(showData) {
      setAllUser(users)
      window.scrollTo({
        left: 0,
        top: 1000,
        behavior: 'smooth'
      })
      
    }else{
      setAllUser(data)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    
  }, [users, showData])

  // Mutation to delete user
  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
      Swal.fire('Deleted!', 'User has been removed.', 'success');
    },
  });

  // Mutation to update user role
  const { mutate: updateUserRole } = useMutation({
    mutationFn: async ({ id, newRole }) => {
      return await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
      Swal.fire('Updated!', 'User role updated.', 'success');
    },
  });

  // Handle dropdown change
  const handleRoleChange = (id, newRole) => {
    updateUserRole({ id, newRole });
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4 text-center mt-5">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200 rounded-2xl p-2">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Email</th>
              <th>Coin</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user) => (
              <tr key={user._id} className="border-t">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.coin || 0}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setShowData(!showData)} className='bg-gray-500 px-3 py-2 rounded-2xl w-full mt-5 text-white font-bold cursor-pointer'>{showData ? 'Hide Data' : 'show Data'}</button>
      </div>
    </div>
  );
};

export default AllUsers;
