import React from 'react';
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {

    if(localStorage.getItem('token')){
        return children;
    }else{
        return  <Navigate to={'/login'}></Navigate>
    }

}

export default ProtectedRoute;