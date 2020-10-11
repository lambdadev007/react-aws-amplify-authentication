import React, { useContext } from 'react';
import { CognitoAuthUserContext } from "../../App/index";
import { Route } from 'react-router-dom';
import AdminLayout from '../../App/layout/AdminLayout';

const AuthAux = (props) => { 
    const user = useContext(CognitoAuthUserContext);

    return (
        user ? <Route path="/" component={AdminLayout} /> : props.children
    ) 
};

export default AuthAux;