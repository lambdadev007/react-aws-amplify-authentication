import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import "./../../../../assets/scss/style.scss";
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import { Auth } from "aws-amplify";
import { CognitoAuthUserContext } from "../../../index";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(true);
    const user = useContext(CognitoAuthUserContext);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setError(undefined);
        Auth.signIn({ username: email, password })
        .catch(err => {
            setError(err.message);
            if(err.message === "User is not confirmed.") {
                setIsConfirmed(false);
            }
        });
    }

    useEffect(() => {
        if (user) setIsLoggedIn(true);
    }, [user]);

    return(
        <Aux>
            {
                isLoggedIn ? <Redirect to="/dashboard" /> : (
                    <>
                        <Breadcrumb/>
                        <div className="auth-wrapper">
                            <div className="auth-content">
                                <div className="auth-bg">
                                    <span className="r"/>
                                    <span className="r s"/>
                                    <span className="r s"/>
                                    <span className="r"/>
                                </div>
                                <div className="card">
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body text-center">
                                            <div className="mb-4">
                                                <i className="feather icon-unlock auth-icon"/>
                                            </div>
                                            <h3 className="mb-4">Login</h3>
                                            <div className="input-group mb-3">
                                                <input
                                                type="email" 
                                                className="form-control" 
                                                name="email" 
                                                onChange={e => setEmail(e.target.value)} 
                                                placeholder="Email"
                                                value={email}
                                                />
                                            </div>
                                            <div className="input-group mb-4">
                                                <input
                                                type="password" 
                                                className="form-control" 
                                                name="password" 
                                                onChange={e => setPassword(e.target.value)} 
                                                placeholder="password"
                                                />
                                            </div>
                                            <div className="form-group text-left">
                                                <div className="checkbox checkbox-fill d-inline">
                                                    <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                                </div>
                                            </div>
                                            {
                                                error ? (
                                                    <div className="form-group text-left">
                                                        <p className="text-danger">{error}</p>
                                                    </div>
                                                ) : null
                                            }
                                            <button type="submit" className="btn btn-primary shadow-2 mb-4">Login</button>
                                            <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password">Reset</NavLink></p>
                                            <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/register">Signup</NavLink></p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </Aux>
    );
}

export default SignIn;