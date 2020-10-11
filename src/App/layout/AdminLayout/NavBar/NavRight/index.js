import React, { useContext } from 'react';
import {Dropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

import { Auth } from 'aws-amplify';
import { CognitoAuthUserContext } from "../../../../index";

const NavRight = props => {
    const user = useContext(CognitoAuthUserContext);

    const logOut = async (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        await Auth.signOut();
    }

    return (
        <Aux>
            <ul className="navbar-nav ml-auto">
                <li>
                    <Dropdown alignRight={!props.rtlLayout} className="drp-user">
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <i className="icon feather icon-settings"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                {
                                    user ? (
                                        <>
                                            <span>{user.attributes.given_name} {user.attributes.family_name}</span>
                                            <a href={DEMO.BLANK_LINK} className="dud-logout" onClick={e => logOut(e)} title="Logout">
                                                <i className="feather icon-log-out"/>
                                            </a>
                                        </>
                                    ) : null
                                }
                            </div>
                            <ul className="pro-body">
                                <li>
                                    <NavLink to="/profile" className="dropdown-item">
                                        <Dropdown.Item as="span">
                                            <i className="feather icon-user"/> Profile
                                        </Dropdown.Item>
                                    </NavLink>
                                </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </Aux>
    );
}

export default NavRight;
