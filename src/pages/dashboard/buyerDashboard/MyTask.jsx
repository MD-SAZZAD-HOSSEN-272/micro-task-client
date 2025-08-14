import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AuthUser from '../../../hooks/AuthUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../Components/Loader';

const MyTask = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState(null);

  // ✅ Fetch buyer's own tasks
  const { data: myTasks = [], isLoading } = useQuery({
    queryKey: ['myTasks', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  // ✅ Delete task with confirmation
  const { mutate: deleteTask } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/tasks/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myTasks']);
      Swal.fire('Deleted!', 'Your task has been removed.', 'success');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className=" overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">My Posted Tasks</h2>
      <div className=' border border-gray-300 shadow-2xl overflow-hidden p-5 rounded-2xl'>
        <table className="table w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>Image</th>
            <th>Title</th>
            <th>Workers</th>
            <th>Pay</th>
            <th>Deadline</th>
            <th>Submission</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='mt-5'>
          {myTasks.map((task) => (
            <tr key={task._id} className='border m-2 rounded-2xl border-gray-400'>
              <td>
                <img src={task.task_image_url} alt="task" className="w-16 h-16 rounded m-2" />
              </td>
              <td>{task.task_title}</td>
              <td>{task.required_workers}</td>
              <td>${task.payable_amount}</td>
              <td>{task.completion_date}</td>
              <td>{task.submission_info}</td>
              <td>
                <button
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <FaEye />
                </button>
              </td>
              <td>
                <button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDelete(task._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* 🔍 Modal for showing task detail */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-2">{selectedTask.task_title}</h3>
            <img
              src={selectedTask.task_image_url}
              alt="task"
              className="w-full h-40 object-cover rounded mb-3"
            />
            <p className="mb-2">
              <strong>Details:</strong> {selectedTask.task_detail}
            </p>
            <p className="mb-2">
              <strong>Submission Info:</strong> {selectedTask.submission_info}
            </p>
            <p className="mb-2">
              <strong>Pay:</strong> ${selectedTask.payable_amount}
            </p>
            <p className="mb-2">
              <strong>Deadline:</strong> {selectedTask.completion_date}
            </p>
            <button
              className="mt-3 bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
