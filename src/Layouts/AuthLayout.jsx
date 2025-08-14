import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
       <div className='max-w-7xl mx-auto px-4 py-3'>
        <Link to="/" className="text-xl font-bold text-blue-600">
          MicroTasker
        </Link>
         <div className='flex justify-center items-center gap-20'>
            <div>
                <Outlet></Outlet>
            </div>
            <div>
                lottie will add
            </div>
        </div>
       </div>
    );
};

export default AuthLayout;