import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import "./../../../../assets/scss/style.scss";
import AuthAux from "./../../../../hoc/_Aux/auth";
import DEMO from "../../../../store/constant";

import { Auth } from 'aws-amplify';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [verified, setVerified] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState(undefined);
    const [codeErr, setCodeErr] = useState(undefined);

    const willInit = localStorage.getItem('willInit');

    const signUp = () => {
        localStorage.setItem("willInit", "false");
        const firstName = username.split(' ')[0];
        const lastName = username.split(' ').length > 1 ? username.split(' ')[1] : '';

        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                given_name: firstName,
                family_name: lastName,
            },
        })
        .then(res => {
            setVerified(true);
        })
        .catch(err => {
            console.log('[err]', err);
            setError(err.message);
        });
    };

    const confirmSignUp = () => {
        setError(undefined);
        setCodeErr(undefined);
        Auth.confirmSignUp(email, confirmationCode, {
            forceAliasCreation: true
        })
        .then(res => {
            Auth.signIn({ username: email, password })
                .catch(err => {
                    setError(err);
                });
        })
        .catch(err => setCodeErr(err));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError(undefined);
        setCodeErr(undefined);
        if (verified) {
            console.log('verified');
            confirmSignUp();
        } else {
            signUp();
        }
    };

    useEffect(() => {
        if(localStorage.getItem('willInit') === "true") {
            setVerified(false);
            setEmail('');
            setPassword('');
            setUsername('');
            setError(undefined);
            setConfirmationCode('');
        }
    }, [willInit]);

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
                            <form onSubmit={handleSubmit}>
                                {
                                    verified ? (
                                        <>
                                            <div className="mb-4">
                                                <i className="feather icon-user-plus auth-icon"/>
                                            </div>
                                            <h3 className="mb-4">Confirm code</h3>
                                            <div className="input-group mb-4">
                                                <input type="text" className={`form-control${codeErr ? 'is-invalid' : ''}`} value={confirmationCode} placeholder="Confirmation code" onChange={e => setConfirmationCode(e.target.value)} required/>
                                            </div>
                                            {
                                                codeErr ? (
                                                    <>
                                                        <div className="form-group text-left">
                                                            <p className="text-danger">{codeErr}</p>
                                                        </div>
                                                    </>
                                                ) : null
                                            }
                                            <button type="submit" className="btn btn-primary shadow-2 mb-4">Submit</button>
                                            <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/login">Login</NavLink></p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4">
                                                <i className="feather icon-user-plus auth-icon"/>
                                            </div>
                                            <h3 className="mb-4">Sign up</h3>
                                            <div className="input-group mb-3">
                                                <input type="text" className={`form-control${error ? ' is-invalid' : ''}`} placeholder="Name" name="name" value={username} onChange={e => setUsername(e.target.value)} required autoFocus/>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input type="email" className={`form-control${error ? ' is-invalid' : ''}`} placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                                            </div>
                                            <div className="input-group mb-4">
                                                <input type="password" className={`form-control${error ? ' is-invalid' : ''}`} placeholder="password" name="password" onChange={e => setPassword(e.target.value)} required/>
                                            </div>
                                            <div className="form-group text-left">
                                                <div className="checkbox checkbox-fill d-inline">
                                                    <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                                        <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                                                </div>
                                            </div>
                                            {
                                                error ? (
                                                    <>
                                                        <div className="form-group text-left">
                                                            <p className="text-danger">{error}</p>
                                                        </div>
                                                    </>
                                                ) : null
                                            }
                                            <button type="submit" className="btn btn-primary shadow-2 mb-4">Sign up</button>
                                            <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/login">Login</NavLink></p>
                                        </>
                                    )
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthAux>
    );
}

export default SignUp;