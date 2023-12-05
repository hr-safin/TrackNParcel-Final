import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const {user, isLoading} = useContext(AuthContext)
    const location = useLocation()

   

    if(user){
        return children
    }

    if(isLoading){
        return <div className=' h-screen flex justify-center items-center text-blur=e-500'><span className="loading loading-spinner loading-lg"></span></div>
       }
    return <Navigate to="/signIn"></Navigate>
};

export default PrivateRouter;