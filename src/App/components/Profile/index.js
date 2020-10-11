import React, { useEffect, useState, useContext } from 'react';
import { ChevronDown } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../layout/AdminLayout/Breadcrumb';
import { CognitoAuthUserContext } from "../../index";
import { Auth } from 'aws-amplify';

const Profile = () => {
    const user = useContext(CognitoAuthUserContext);
    const [bodyShow, setBodyShow] = useState(true);
    const [name, setName] = useState('');
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');

    const toaster = (type, message) => {
        if (type === 'success') {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (type === 'error') {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleUpdateName = async (e) => {
        e.preventDefault();
        if(!name) {
            toaster('error', 'Name can not be blank!');
        }
        const firstName = name.split(' ')[0];
        const lastName = name.split(' ').length > 1 ? name.split(' ')[1] : '';

        try {
            let result = await Auth.updateUserAttributes(user, {
                'given_name': firstName,
                'family_name': lastName
            });
    
            if(result) {
                toaster('success', '🎉 Successfully updated!');
            }
            else {
                toaster('error', 'Something went wrong!');
            }
        }
        catch(err) {
            toaster('error', err.message);
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if(!oldPwd) {
            toaster('error', 'Old password can not be blank!');
        }
        if(!newPwd) {
            toaster('error', 'New password can not be blank!');
        }

        try {
            const result = await Auth.changePassword(user, oldPwd, newPwd);

            if(result) {
                toaster('success', '🎉 Successfully updated!');
            }
            else {
                toaster('error', 'Something went wrong!');
            }
        }
        catch(err) {
            toaster('error', err.message);
        }
    }

    useEffect(() => {
        if(user)
            setName(`${user.attributes.given_name} ${user.attributes.family_name}`)
    }, [user]);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                {/* Same as */}
            <ToastContainer />

            <Breadcrumb name="Profile" />
           <div className="page-wrapper contact-form">
                <div className="card">
                    <div className="card-header">
                        <h5>Profile</h5>

                        <div className="accordion-toggler">
                            <NavLink to="#" className={`${bodyShow ? 'down' : 'up'}`} onClick={() => { setBodyShow(!bodyShow) }}>
                                <ChevronDown />
                            </NavLink>
                        </div>
                    </div>
                    <div className={`card-body accordion-body ${bodyShow ? 'show' : 'hide'}`} id="accordion-body-1">
                        <div className="card">
                            <div className="card-header">
                                <h5>Update name</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleUpdateName }>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className=" form-group mx-sm-3 mb-2">
                                                <label className="sr-only">Name</label>
                                                <input type="text" className="form-control" required placeholder="Name" name="Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus={true} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group mx-sm-3 mb-2">
                                                <button type="submit" value="Create" className="btn btn-primary form-control" >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h5>Update password</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleUpdatePassword }>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            <div className=" form-group mx-sm-3 mb-2">
                                                <label className="sr-only">Old Password</label>
                                                <input type="password" className="form-control" required placeholder="Old password" name="old_password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} />
                                            </div>
                                            <div className=" form-group mx-sm-3 mb-2">
                                                <label className="sr-only">New Password</label>
                                                <input type="password" className="form-control" required placeholder="New Password" name="new_password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group mx-sm-3 mb-2">
                                                <button type="submit" value="Create" className="btn btn-primary form-control" >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;