import React from 'react';
import { NavLink } from 'react-router-dom';

import Aux from '../../../../hoc/_Aux/index';
import logo from '../../../../assets/images/logo.png';

const Navbar = () => {
    return (
        <Aux>
            <section className="container">
                <div className="header-wrapper">
                    <div className="d-flex bt-white p-4">
                        <div className="logo">
                            <NavLink to="/">
                                <img src={logo} height="24" alt="Landrick" />
                            </NavLink>
                        </div>
                        <div className="menu"></div>
                    </div>
                </div>
            </section>
        </Aux>
    );
};

export default Navbar;