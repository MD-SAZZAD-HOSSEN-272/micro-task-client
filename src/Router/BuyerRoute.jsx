import React from 'react';
import AuthUser from '../hooks/AuthUser';
import { Navigate } from 'react-router';
import Loader from '../Components/Loader';

const BuyerRoute = ({children}) => {
    const {userData, loading, isLoading} = AuthUser();

    if(loading || isLoading) {
        return <Loader></Loader>
    }
    
    if (userData?.role !== 'buyer'){
        return <Navigate to='/auth/login'></Navigate>
    }
    
    return children
};

export default BuyerRoute;