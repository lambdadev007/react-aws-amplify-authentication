import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home } from 'react-feather';

const Breadcrumb = props => {


    return (
        <div className="page-header">
            <div className="page-block">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink to="/dashboard"><Home size="15" color="black" /></NavLink>
                            </li>
                            <li className="breadcrumb-item">{props.name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;