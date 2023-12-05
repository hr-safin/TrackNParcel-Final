import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useDelivery = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data : isDelivery } = useQuery({
        queryKey : [user?.email, "delivery"],
        queryFn : async () => {
              const res = await axiosSecure.get(`/users/delivery/${user?.email}`)
              return res.data?.delivery
        }
    })
    return [isDelivery]
};

export default useDelivery;