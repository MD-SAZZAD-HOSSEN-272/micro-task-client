import { useEffect, useRef, useState } from "react";
import AuthUser from "../hooks/AuthUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from "react-icons/fa";

const NotificationPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button className="relative" onClick={() => setIsOpen(!isOpen)}>
        
        <button className="text-xl">
          <FaBell />
          {/* Font Awesome or Lucide React icon */}
        </button>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
          {notifications?.length}
        </span>
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded p-4 z-50 max-h-96 overflow-y-auto"
        >
          <h4 className="font-semibold mb-2">Notifications</h4>
          <ul className="space-y-2">
            {notifications.map((note, idx) => (
              <li key={idx} className="border-b pb-2">
                <p className="text-sm">{note.message}</p>
                <small className="text-xs text-gray-500">
                  {new Date(note.time).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationPopUp;
