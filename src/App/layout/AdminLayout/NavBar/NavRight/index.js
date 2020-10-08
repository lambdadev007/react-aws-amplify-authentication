import React, { useState, useContext } from 'react';
import {Dropdown} from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';

import { Auth } from 'aws-amplify';
import { CognitoAuthUserContext } from "../../../../index";

const NavRight = props => {
    const [listOpen, setListOpen] = useState(false);
    const user = useContext(CognitoAuthUserContext);

    const logOut = async (event) => {
        event.preventDefault();
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
                                <span>{user.attributes.given_name} {user.attributes.family_name}</span>
                                <a href={DEMO.BLANK_LINK} className="dud-logout" onClick={e => logOut(e)} title="Logout">
                                    <i className="feather icon-log-out"/>
                                </a>
                            </div>
                            <ul className="pro-body">
                                <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-user"/> Profile</a></li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
            <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
        </Aux>
    );
}

export default NavRight;
