import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AuthUser from "../../../hooks/AuthUser";
import Loader from "../../../Components/Loader";

const BuyerTasks = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = AuthUser();
  const [showMore, setShowMore] = useState(false)
  const [allTask, setAllTask] = useState([])
  const { data: tasks = [], isLoading, refetch } = useQuery({
    queryKey: ["buyerTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission-tasks?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if(showMore){
      setAllTask(tasks)
    }else{
      const someTask = tasks.slice(0, 5)
      setAllTask(someTask)
    }
  }, [tasks, showMore])

  console.log(showMore, allTask);

  const handleAction = async (id, status) => {
    await axiosSecure.patch(`/submission-tasks/${id}`, { status });
    refetch();
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Submission Tasks</h2>

      <table className="min-w-full table-auto border text-left shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2">Worker</th>
            <th className="p-2">Title</th>
            <th className="p-2">Payable</th>
            <th className="p-2">Submission</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allTask.map((task) => (
            <tr key={task._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-2">{task.worker_name || "Unnamed Worker"}</td>
              <td className="p-2">{task.task_title}</td>
              <td className="p-2">${task.payable_amount}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedSubmission(task)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
              <td className="p-2 capitalize">{task.status}</td>
              <td className="p-2 space-x-2">
                <button
                  disabled={task.status === "approved" || task.status === "rejected"}
                  onClick={() => handleAction(task._id, "approved")}
                  className={`px-2 py-1 rounded transition ${
                    task.status === "approved" || task.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Approve
                </button>
                <button
                  disabled={task.status === "approved" || task.status === "rejected"}
                  onClick={() => handleAction(task._id, "rejected")}
                  className={`px-2 py-1 rounded transition text-white ${
                    task.status === "approved" || task.status === "rejected"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowMore(!showMore)} className="p-2 cursor-pointer bg-blue-400 text-white rounded-xl mt-5 font-bold w-full">{
        showMore ? 'Hide Some Tasks' : 'See More Tasks'}</button>

      {/* ✅ Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-white/10 backdrop-blur flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative p-10">
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Submission Detail
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Task Title:</span> {selectedSubmission.task_title}</p>
              <p><span className="font-semibold">Submitted By:</span> {selectedSubmission.worker_email}</p>
              <p><span className="font-semibold">Submitted At:</span> {new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
              <p><span className="font-semibold">Payable Amount:</span> ${selectedSubmission.payable_amount}</p>
              <p><span className="font-semibold">Details:</span> {selectedSubmission.submission_details}</p>
              {selectedSubmission.submission_detail?.startsWith("http") && (
                <img
                  src={selectedSubmission.submission_detail}
                  alt="Submission Proof"
                  className="rounded border mt-3 max-h-64 w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerTasks;
