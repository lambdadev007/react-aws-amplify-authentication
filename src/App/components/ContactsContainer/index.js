import React from 'react';

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
                <div className="card-header">
                    <h5 style={{textTransform: "uppercase"}}>{contacts[0]}</h5>
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