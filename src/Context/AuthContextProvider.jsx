import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";

const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
const axiosSecure = useAxiosSecure()
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)

  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithEmail = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []);



    const {data: userData, refetch, isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`)
            return res.data
        },
        // initialData: {}
    })
  const authInfo = {
    loginWithGoogle,
    loginWithEmail,
    signInWithEmail,
    user,
    logout,
    userData,
    refetch,
    loading,
    isLoading,

  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
