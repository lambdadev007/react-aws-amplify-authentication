import React, { useEffect, useState, forwardRef } from 'react';
import { UserPlus } from 'react-feather';


const ContactForm = (props, ref) => {
    const [bodyShow, setBodyShow] = useState(true);

    useEffect(() => {
        console.log('[body height]', document.getElementById('accordion-body-1').clientHeight);
        document.getElementById('accordion-body-1').style.height = document.getElementById('accordion-body-1').clientHeight + 'px';
    }, []);
    return (
        <div>
            <div className="page-wrapper contact-form">
                <div className="card">
                    <div className="card-header"  onClick={() => { setBodyShow(!bodyShow) }}>
                        <h5>{props.title}</h5>
                    </div>
                    <div className={`card-body accordion-body ${bodyShow ? 'show' : 'hide'}`} id="accordion-body-1">
                        <form onSubmit={props.formType === 'create' ? props.handleCreateRecord : props.handleUpdateRecord}>
                            <div className="row">
                                <div className="col-md-4 col-sm-12">
                                    <div className=" form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Name</label>
                                        <input maxLength="50" ref={ref} className="form-control" required placeholder="Name" value={props.formFields.name} name="Name" onChange={e => props.setFormFields('name', e.target.value)} autoFocus={true} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Team Name</label>
                                        <input maxLength="50" className="form-control" placeholder="Team Name" value={props.formFields.teamName} name="TeamName" onChange={e => props.setFormFields('teamName', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Role</label>
                                        <input maxLength="50" className="form-control" placeholder="Role" value={props.formFields.role} name="Role" onChange={e => props.setFormFields('role', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-sm-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Email</label>
                                        <input maxLength="50" className="form-control" placeholder="Email" value={props.formFields.email} name="Email" onChange={e => props.setFormFields('email', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <label className="sr-only">Phone</label>
                                        <input maxLength="15" className="form-control" placeholder="Phone" value={props.formFields.phone} name="Phone" onChange={e => props.setFormFields('phone', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <select className="form-control" id="exampleFormControlSelect1" name="Region" value={props.formFields.region} onChange={e => props.setFormFields('region', e.target.value)} >
                                            <option value="European">European</option>
                                            <option value="American">American</option>
                                            <option value="Asian">Asian</option>
                                            <option value="African">African</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mx-sm-3 mb-2 py-2">
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" checked={props.formFields.gender === "Male"} id="customRadioInline1" name="Gender" className="custom-control-input" value="Male" onChange={e => props.setFormFields('gender', e.target.value)} />
                                            <label className="custom-control-label" htmlFor="customRadioInline1"> Male</label>
                                        </div>
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input checked={props.formFields.gender === "Female"} type="radio" id="customRadioInline2" name="Gender" className="custom-control-input" value="Female" onChange={e => props.setFormFields('gender', e.target.value)} />
                                            <label className="custom-control-label" htmlFor="customRadioInline2">Female</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <button type="submit" value="Create" className="btn btn-primary form-control" > <UserPlus /> </button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(ContactForm);