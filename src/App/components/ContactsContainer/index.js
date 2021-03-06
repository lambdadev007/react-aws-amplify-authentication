import React from 'react';
import { ArrowUp } from 'react-feather';
import { NavLink } from 'react-router-dom';

import Contact from './Contact'

const ContactsContainer = props => {
    if (!props.allContacts) return (
        <div>
            <p className="text-center">Loading...</p>
        </div>
    )

    if (props.allContacts.length === 0) return (
        <div>
            <p className="text-center">No contacts found</p>
        </div>
    )

    return props.allContacts.map((contacts) => {
        return (
            <div className="card Recent-Users" key={contacts[0]}>
                <div className="card-header" id={`contact-${contacts[0]}`}>
                    <h5 style={{textTransform: "capitalize"}}>{contacts[0]}</h5>

                    <div className="arrow-wrapper">
                        <NavLink to="#" onClick={() => { window.scrollTo(0, 0); }}>
                            <ArrowUp />
                        </NavLink>
                    </div>
                </div>
                <div className="card-block px-0 py-3">
                    <div className="table-responsive px-4">
                        <table className="table table-hover mb-0">
                            <tbody>
                                {
                                    contacts[1].map((contact) =>
                                        <Contact
                                            key={contact.id}
                                            contact={contact}
                                            onEditRequest={props.onEditRequest}
                                            allContacts={props.allContacts}
                                            handleDeleteContact={props.handleDeleteContact}
                                        />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    });
};

export default ContactsContainer;