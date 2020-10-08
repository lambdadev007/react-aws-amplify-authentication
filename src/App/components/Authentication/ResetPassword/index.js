import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import "./../../../../assets/scss/style.scss";
import AuthAux from "./../../../../hoc/_Aux/auth";
import { Auth } from "aws-amplify";

const ResetPassword = () => {
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    // const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState("");

    const handleSendCodeClick = async event => {
        event.preventDefault();
        setError(undefined);

        try {
            await Auth.forgotPassword(email);
            setCodeSent(true);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleConfirmClick = async event => {
        event.preventDefault();
        setError(undefined);
        // setIsConfirming(true);
        try {
            await Auth.forgotPasswordSubmit(email, code, password);
            setConfirmed(true);
        } catch (e) {
            setError(e.message);
            // setIsConfirming(false);
        }
    };

    const errorMsg = (
        error ? (
            <div className="form-group text-left">
                <p className="text-danger">{error}</p>
            </div>
        ) : null
    );

    const sendRequestForm = (
        <form onSubmit={handleSendCodeClick}>
            <div className="input-group mb-3">
                <input
                 type="email" 
                 name="email"
                 className="form-control" 
                 placeholder="Email" 
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 required 
                />
            </div>

            {errorMsg}
            <button className="btn btn-primary shadow-2 mb-4">Send request</button>
        </form>
    );

    const confirmationForm = (
        <form onSubmit={handleConfirmClick}>
            <div className="input-group mb-3">
                <input
                 type="text" 
                 className="form-control" 
                 name="code" 
                 placeholder="Confirmation Code" 
                 value={code} 
                 onChange={e => setCode(e.target.value)} 
                 autoComplete="false" 
                 required
                />
            </div>
            <div className="input-group mb-3">
                <input
                 type="password" 
                 className="form-control" 
                 name="password" 
                 placeholder="New Password" 
                 value={password} 
                 onChange={e => setPassword(e.target.value)} 
                 required
                />
            </div>

            {errorMsg}
            <button className="btn btn-primary shadow-2 mb-4">Submit</button>
        </form>
    );

    const successForm = (
        <div className="form-group text-center">
            <p>Your password has been reset.</p>
        </div>
    );

    return(
        <AuthAux>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon"/>
                            </div>
                            <h3 className="mb-4">Reset Password</h3>
                            {!codeSent
                            ? sendRequestForm
                            : !confirmed
                                ? confirmationForm
                                : successForm}
                            <p className="mb-2 text-muted"><NavLink to="/auth/login">Return to SignIn</NavLink></p>
                            <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/register">Signup</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthAux>
    );
}

export default ResetPassword;