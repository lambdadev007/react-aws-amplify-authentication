import React, { useState } from 'react';
import { API, graphqlOperation  } from 'aws-amplify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContacts } from '../../../graphql/mutations';
// import * as mutations from '../graphql/mutations';

import { UserPlus } from 'react-feather';


const ContactForm = () => {
    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('European');

    const handleCreateRecord = async (e) => {
        e.preventDefault();

        const contact = {
            Name: name,
            TeamName: teamName,
            Role: role,
            Gender: gender,
            Email: email,
            Phone: phone,
            Region: region,
        };
    
        try {
            const data = await API.graphql(graphqlOperation(createContacts, { input: contact }));

            if (data) {
                setName('');
                setTeamName('');
                setRole('');
                setEmail('');
                setGender('Male');
                setPhone('');
                setRegion('European');
    
                toast.success('🎉 Contact created successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error("Error occurred while creating the contact", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch(err) {
            toast.error(err.message, {
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

    return (
        <div>
            <div className="page-wrapper">
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
                <div className="card">
                    <div className="card-header">
                        <h5>Add new contact</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleCreateRecord}>
                            <div className="form-inline">
                                <div className="form-group mx-sm-3 mb-2">
                                    <label className="sr-only">Name</label>
                                    <input maxLength="50" className="form-control" required placeholder="Name" value={name} name="Name" onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <label className="sr-only">Team Name</label>
                                    <input maxLength="50" className="form-control" placeholder="Team Name" value={teamName} name="TeamName" onChange={e => setTeamName(e.target.value)} />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <label className="sr-only">Role</label>
                                    <input maxLength="50" className="form-control" placeholder="Role" value={role} name="Role" onChange={e => setRole(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-inline">
                                <div className="form-group mx-sm-3 mb-2">
                                    <label className="sr-only">Email</label>
                                    <input maxLength="50" className="form-control" placeholder="Email" value={email} name="Email" onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <label className="sr-only">Phone</label>
                                    <input maxLength="15" className="form-control" placeholder="Phone" value={phone} name="Phone" onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <select className="form-control" id="exampleFormControlSelect1" name="Region" value={region} onChange={e => setRegion(e.target.value)} >
                                        <option value="European">European</option>
                                        <option value="American">American</option>
                                        <option value="Asian">Asian</option>
                                        <option value="African">African</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-inline form-group mx-sm-3 mb-2">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" checked={gender === "Male"} id="customRadioInline1" name="Gender" className="custom-control-input" value="Male" onChange={e => setGender(e.target.value)} />
                                    <label className="custom-control-label" htmlFor="customRadioInline1"> Male</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input checked={gender === "Female"} type="radio" id="customRadioInline2" name="Gender" className="custom-control-input" value="Female" onChange={e => setGender(e.target.value)} />
                                    <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                </div>

                            </div>
                            <button type="submit" value="Create" className="btn btn-primary form-group col-md-10" > <UserPlus /> </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;