import React, { useState, useEffect, useContext } from 'react';
import { CognitoAuthUserContext } from "../../App/index";
import { Redirect } from 'react-router-dom';

const AuthAux = (props) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useContext(CognitoAuthUserContext);

    useEffect(() => {
        if (user) setIsLoggedIn(true);
    }, [user]);

    return (
        isLoggedIn ? <Redirect to="/dashboard" /> : props.children
    ) 
};

export default AuthAux;