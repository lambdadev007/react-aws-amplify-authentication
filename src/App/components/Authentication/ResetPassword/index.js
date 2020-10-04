import React from 'react';
import { NavLink } from 'react-router-dom';

import "./../../../../assets/scss/style.scss";
import Aux from "./../../../../hoc/_Aux";
import Breadcrumb from "../../../layout/AdminLayout/Breadcrumb";

class ResetPassword extends React.Component {
    render () {

        return(
            <Aux>
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
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Reset Password</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                </div>

                                <button className="btn btn-primary shadow-2 mb-4">Send request</button>
                                <p className="mb-2 text-muted"><NavLink to="/auth/login">Return to SignIn</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/register">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default ResetPassword;