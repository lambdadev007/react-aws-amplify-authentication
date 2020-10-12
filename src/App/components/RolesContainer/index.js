import React from 'react';
import { ArrowUp } from 'react-feather';
import { NavLink } from 'react-router-dom';
import Role from './Role'

const RolesContainer = props => {
    if (!props.allRoles) return (
        <div>
            <p className="text-center">Loading...</p>
        </div>
    )

    if (props.allRoles.length === 0) return (
        <div>
            <p className="text-center">No roles found</p>
        </div>  
    )

    return props.allRoles.map((contacts) => {
        return (
            contacts[1].length > 0 ? (
                <div className="card Recent-Users" key={contacts[0]}>
                    <div className="card-header" id={`role-${contacts[0]}`}>
                        <h5 style={{textTransform: "uppercase"}}>{contacts[0]}</h5>

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
                                        contacts[1].map((contact, index) =>
                                            <Role
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
            ) : null
        );
    });
};

export default RolesContainer;