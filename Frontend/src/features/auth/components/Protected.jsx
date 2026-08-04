import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'

const Protected = ({children}) => {

    const { loading,user } = useAuth();

    console.log("Protected:", { loading, user });

    if(loading){
        return <h1>Loading...</h1>;
    }

    if(!user){
        return <Navigate to="/login" />;
    }

  return children
}

export default Protected
