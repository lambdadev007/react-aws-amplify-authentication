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

    return props.allRoles.map((roles) => {
        return (
            <div className="card Recent-Users" key={roles[0]}>
                <div className="card-header" id={`role-${roles[0]}`}>
                    <h5 style={{textTransform: "uppercase"}}>{roles[0]}</h5>

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
                                    roles[1].map((role, index) =>
                                        <Role
                                            key={index}
                                            role={role}
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

export default RolesContainer;