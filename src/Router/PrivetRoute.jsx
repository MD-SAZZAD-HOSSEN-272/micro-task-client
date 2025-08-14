import React from 'react';
import { Navigate } from 'react-router';
import AuthUser from '../hooks/AuthUser';
import Loader from '../Components/Loader';

const PrivetRoute = ({children}) => {
    const {user, loading, isLoading} = AuthUser();

    if(loading || isLoading) {
        return <Loader></Loader>
    }
    
    if (!user){
        return <Navigate to='/auth/login'></Navigate>
    }
    
    return children
};

export default PrivetRoute;