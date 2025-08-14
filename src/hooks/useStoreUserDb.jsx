import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const useStoreUserDb = () => {
     const mutation = useMutation({
    mutationFn: async (data) => {
        console.log(data);
      const res = await useAxiosSecure.post("/users", data);
      console.log(res);
      return res;
    },
  });

    return mutation;
};

export default useStoreUserDb;