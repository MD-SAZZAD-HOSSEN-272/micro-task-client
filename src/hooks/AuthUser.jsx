import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const AuthUser = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default AuthUser;