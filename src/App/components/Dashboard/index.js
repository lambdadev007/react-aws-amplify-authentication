import React, { useState, useEffect, createRef } from 'react';
import { API, graphqlOperation  } from 'aws-amplify'
import { ToastContainer, toast } from 'react-toastify';

import { getContacts, listContactss } from "../../../graphql/queries";
import { createContacts, updateContacts, deleteContacts } from '../../../graphql/mutations';
import { onDeleteContacts } from '../../../graphql/subscriptions';

// import { Row, Col, Card } from 'react-bootstrap';
import Breadcrumb from '../../layout/AdminLayout/Breadcrumb';
import ContactForm from '../ContactForm';
import ContactsContainer from '../ContactsContainer';
import 'react-toastify/dist/ReactToastify.css';

import Aux from "../../../hoc/_Aux";

const initialFormFields = {
    name: '',
    teamName: '',
    role: '',
    email: '',
    gender: 'Male',
    phone: '',
    region: 'European'
};

const Dashboard = () => {
    const [title, setTitle] = useState('Add new contact');
    const [formType, setFormType] = useState('create');
    const [formFields, setFormFields] = useState(initialFormFields);
    const [editId, setEditId] = useState(undefined);
    const [allContacts, setAllContacts] = useState();
    const nameRef = createRef();

    const toaster = (type, message) => {
        if (type === 'success') {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (type === 'error') {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const editRequestHandler = async (contactId) => {
        setEditId(contactId);
        const result = await API.graphql(graphqlOperation(getContacts, { id: contactId }));
        if(result.data.getContacts) {
            setFormFields({
                name: result.data.getContacts.Name,
                teamName: result.data.getContacts.TeamName,
                role: result.data.getContacts.Role,
                email: result.data.getContacts.Email,
                gender: result.data.getContacts.Gender,
                phone: result.data.getContacts.Phone,
                region: result.data.getContacts.Region,
            });
            setTitle('Edit contact');
            setFormType('edit');
            nameRef.getInputDOMNode.focus();
        }
        else {
            toaster('error', 'Contact not found');
            setTitle('Add new contact');
            setFormType('create');
        }
    }

    const getAllContacts = async () => {
        const result = await API.graphql(graphqlOperation(listContactss));
        const filteredResult = result.data.listContactss.items.sort((a, b) => {
            return (a.Name < b.Name) ? -1 : (a.Name > b.Name) ? 1 : 0;
        });

        let groupedCollection = [];   
        for(let i = 0; i < filteredResult.length; i++){//loop throug collection         
            var firstLetter = filteredResult[i].Name.charAt(0);
            if(groupedCollection[firstLetter] === undefined){             
                groupedCollection[firstLetter] = [];         
            }         
            groupedCollection[firstLetter].push(filteredResult[i]);     
        }

        setAllContacts(Object.entries(groupedCollection));
    };

    const handleCreateRecord = async (e) => {
        e.preventDefault();

        const contact = {
            Name: formFields.name,
            TeamName: formFields.teamName,
            Role: formFields.role,
            Gender: formFields.gender,
            Email: formFields.email,
            Phone: formFields.phone,
            Region: formFields.region,
        };
    
        try {
            const data = await API.graphql(graphqlOperation(createContacts, { input: contact }));

            if (data) {
                setFormFields(initialFormFields);
    
                toaster('success', '🎉 Contact created successfully!');
            }
            else {
                toaster('error', 'Error occurred while creating the contact');
            }
        } catch(err) {
            toaster('error', err.message);
        }
    }

    const handleUpdateRecord = async (e) => {
        e.preventDefault();

        const contact = {
            id: editId,
            Name: formFields.name,
            TeamName: formFields.teamName,
            Role: formFields.role,
            Gender: formFields.gender,
            Email: formFields.email,
            Phone: formFields.phone,
            Region: formFields.region,
        };

        try {
            const data = await API.graphql(graphqlOperation(updateContacts, { input: contact }));

            if (data) {
                setFormFields(initialFormFields);
    
                toaster('success', '🎉 Contact updated successfully!');
                setTitle('Add new contact');
                setFormType('create');
            }
            else {
                toaster('error', 'Error occurred while updating the contact');
            }
        } catch(err) {
            toaster('error', err.message);
        }
    }

    const handleDeleteContact = async toDelID => {
        const input = { id: toDelID }
        try {
            await API.graphql(graphqlOperation(deleteContacts, { input }));

            toaster('success', '🎉 Contact deleted successfully!');
        }
        catch (err) {
            toaster('error', 'Error occurred while deleting the contact');
        }

    }

    const handleFormFields = (state, value) => {
        setFormFields((prevState) => ({...prevState, [state]: value}));
    }

    useEffect(() => {
        console.log('[formFields]', formFields);
    }, [formFields]);

    useEffect(() => {
        getAllContacts();
        setTitle('Add new contact');
    }, []);

    return (
        <Aux>
            <Breadcrumb />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                {/* Same as */}
            <ToastContainer />

            <ContactForm
             title={title} 
             formType={formType}
             formFields={formFields} 
             setFormFields={handleFormFields} 
             handleCreateRecord={handleCreateRecord} 
             handleUpdateRecord={handleUpdateRecord}
             ref={nameRef} 
            />

            <ContactsContainer
             onEditRequest={editRequestHandler} 
             allContacts={allContacts} 
             handleDeleteContact={handleDeleteContact}
            />

        </Aux>
    );
}

export default Dashboard;