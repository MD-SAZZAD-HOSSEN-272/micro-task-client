import React from 'react';
import AuthUser from '../hooks/AuthUser';
import { Navigate } from 'react-router';
import Loader from '../Components/Loader';

const AdminRouter = ({children}) => {
    const {userData, loading, isLoading} = AuthUser()

    if(loading || isLoading) {
        return <Loader></Loader>
    }
    
    if(userData?.role !== 'admin'){
        return <Navigate to='/auth/login'></Navigate>
    }
    
    return children
};

export default AdminRouter;