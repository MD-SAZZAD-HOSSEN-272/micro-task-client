import axios from "axios";
import AuthUser from "./AuthUser";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "https://micro-task-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = AuthUser();
  const token = user?.accessToken;
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);
  return instance;
};

export default useAxiosSecure;
