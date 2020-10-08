import React from 'react';
// import { Row, Col, Card } from 'react-bootstrap';
import Breadcrumb from '../../layout/AdminLayout/Breadcrumb';
import ContactForm from '../ContactForm';

import Aux from "../../../hoc/_Aux";

const Dashboard = () => {

    return (
        <Aux>
            <Breadcrumb />

            <ContactForm />
        </Aux>
    );
}

export default Dashboard;