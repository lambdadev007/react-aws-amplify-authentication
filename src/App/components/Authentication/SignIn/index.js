import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import "./../../../../assets/scss/style.scss";
import AuthAux from "./../../../../hoc/_Aux/auth";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";
import { Auth } from "aws-amplify";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(true);
    const [error, setError] = useState("");
    const [code, setCode] = useState('');
    const [codeErr, setCodeErr] = useState(undefined);
    const [success, setSuccess] = useState(undefined);

    function handleSubmit(event) {
        event.preventDefault();
        setError(undefined);
        Auth.signIn({ username: email, password })
        .catch(err => {
            setError(err.message);
        });
    }

    const confirmNow = () => {
        setError(undefined);
        setIsConfirmed(false);
    }

    const handleConfirm = (e) => {
        e.preventDefault();

        console.log("confirming...");
        setSuccess(undefined);
        setError(undefined);

        Auth.confirmSignUp(email, code, {
            forceAliasCreation: true
        })
        .then(res => {
            console.log('confirmed');
            Auth.signIn({ username: email, password })
                .catch(err => {
                    setSuccess(undefined);
                    setError(err.message);
                    if(err.message === "Incorrect username or password.") {
                        setIsConfirmed(true);
                    }
                });
        })
        .catch(err => {
            setSuccess(undefined);
            setCodeErr(err.message);
            setError(err.message);
        });
    }

    const resendCode = (e) => {
        e.preventDefault();

        Auth.resendSignUp(email).then(() => {
            setError(undefined);
            setCodeErr(undefined);
            setSuccess('Code resent successfully!');
        }).catch(err => {
            setSuccess(undefined);
            setError(err.message);
            setCodeErr(err.message);
        });
    }

    return(
        <AuthAux>
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
                        {
                            isConfirmed ? (
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
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <div className="input-group mb-4">
                                            <input
                                                type="password" 
                                                className="form-control" 
                                                name="password" 
                                                onChange={e => setPassword(e.target.value)} 
                                                placeholder="password"
                                                required
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
                                                <div className="form-group text-center">
                                                    <p><span className="text-danger">{error}</span> { error === "User is not confirmed." ? (
                                                        <NavLink to="#" onClick={confirmNow}>Confirm Now</NavLink>
                                                    ) : null }</p>
                                                </div>
                                            ) : null
                                        }
                                        <button type="submit" className="btn btn-primary shadow-2 mb-4">Login</button>
                                        <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password">Reset</NavLink></p>
                                        <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/register">Signup</NavLink></p>
                                    </div>
                                </form>       
                            ) : (
                                <form onSubmit={e => handleConfirm(e)}>
                                    <div className="card-body text-center">
                                        <div className="mb-4">
                                            <i className="feather icon-unlock auth-icon"/>
                                        </div>
                                        <h3 className="mb-4">Login</h3>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text" 
                                                className="form-control" 
                                                name="code" 
                                                onChange={e => setCode(e.target.value)} 
                                                placeholder="Conformation code"
                                                value={code}
                                                autoComplete="false"
                                                required
                                            />
                                        </div>
                                        {
                                            codeErr ? (
                                                <div className="form-group text-center">
                                                    <p><span className="text-danger">{codeErr}</span></p>
                                                </div>
                                            ) : null
                                        }

                                        <button type="submit" className="btn btn-primary shadow-2 mb-4">Submit</button>

                                        {
                                            success ? (
                                                <div className="form-group text-center">
                                                    <p><span className="text-success">{success}</span></p>
                                                </div>
                                            ) : null
                                        }

                                        <p className="mb-2 text-muted"><NavLink to="#" onClick={e => resendCode(e)}>Resend Code</NavLink></p>
                                        <p className="mb-2 text-muted"><NavLink to="#" onClick={() => setIsConfirmed(true)}>Back</NavLink></p>
                                    </div>
                                </form>
                            )
                        }
                    </div>
                </div>
            </div>
        </AuthAux>
    );
}

export default SignIn;