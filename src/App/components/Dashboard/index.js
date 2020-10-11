import React, { useState, useEffect, useRef, useContext } from 'react';
import { API, graphqlOperation  } from 'aws-amplify';
import { ToastContainer, toast } from 'react-toastify';
import {Tabs, Tab} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

import { getContacts, listContactss } from "../../../graphql/queries";
import { createContacts, updateContacts, deleteContacts } from '../../../graphql/mutations';
import { onCreateContacts, onUpdateContacts, onDeleteContacts } from '../../../graphql/subscriptions';

import { CognitoAuthUserContext } from "../../index";

// import { Row, Col, Card } from 'react-bootstrap';
import Breadcrumb from '../../layout/AdminLayout/Breadcrumb';
import ContactForm from '../ContactForm';
import ContactsContainer from '../ContactsContainer';
import TeamsContainer from '../TeamsContainer';
import RolesContainer from '../RolesContainer';
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
    const [allTeams, setAllTeams] = useState();
    const [allRoles, setAllRoles] = useState();
    const [contactGroups, setContactGroups] = useState();
    const [contactsAlphabet, setContactsAlphabet] = useState();
    const [teamsAlphabet, setTeamsAlphabet] = useState();
    const [rolesAlphabet, setRolesAlphabet] = useState();
    const [bodyShow, setBodyShow] = useState(true);
    const [tabKey, setTabKey] = useState('name');
    const nameRef = useRef();
    const alphabet = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '"', 
        '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', 
        '.', '/', ':', ';', '=', '?', '@', '[', '\\', ']', '^', 
        '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '¢', 
        '£', '¥', '©', '®', '°', '¶', '×', '÷', 'Π', '•', '€', 
        '™', '∆', '√', '✓'
    ];
    const user = useContext(CognitoAuthUserContext);

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
            nameRef.current.focus();
            console.log('[nameRef]', nameRef);
        }
        else {
            toaster('error', 'Contact not found');
            setTitle('Add new contact');
            setFormType('create');
        }
    }

    const groupContacts = (contacts) => {
        let groupedContacts = [];
        const filteredContacts = contacts.sort((a, b) => {
            const m = a.Name.toLowerCase();
            const n = b.Name.toLowerCase();
            return (m < n) ? -1 : (m > n) ? 1 : 0;
        });

        for(let i = 0; i < filteredContacts.length; i++){//loop throug collection         
            var firstLetter = filteredContacts[i].Name.charAt(0).toLowerCase();
            if(groupedContacts[firstLetter] === undefined){             
                groupedContacts[firstLetter] = [];         
            }         
            groupedContacts[firstLetter].push(filteredContacts[i]);     
        }

        return Object.entries(groupedContacts);
    }

    const groupTeamsOrRoles = (teams) => {
        let groupedTeams = [];
        const filteredTeams = teams.sort((a, b) => {
            const m = a.toLowerCase();
            const n = b.toLowerCase();
            return (m < n) ? -1 : (m > n) ? 1 : 0;
        });

        for(let i = 0; i < filteredTeams.length; i++){//loop throug collection         
            var firstLetter = filteredTeams[i].charAt(0).toLowerCase();
            if(groupedTeams[firstLetter] === undefined){             
                groupedTeams[firstLetter] = [];         
            }         
            groupedTeams[firstLetter].push(filteredTeams[i]);     
        }
        console.log('[groupTeamsOrRoles]', Object.entries(groupedTeams));
        return Object.entries(groupedTeams);
    }

    const getAllContacts = async () => {
        // Amplify.configure({
        //     "aws_appsync_authenticationType": "API_KEY", 
        // });

        const result = await API.graphql(graphqlOperation(listContactss));
        setAllContacts(result.data.listContactss.items);
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

    const tabSelectHandler = (key) => {
        if (key === 'team') {
            let temp = allContacts.map((contact) => {
                return contact.TeamName
            });
            temp = temp.filter((value, index, self) => {
                return self.indexOf(value) === index; // get unique team names
            });

            setAllTeams(groupTeamsOrRoles(temp));
        }
        else if (key === 'role') {
            let temp = allContacts.map((contact) => {
                return contact.Role
            });
            temp = temp.filter((value, index, self) => {
                return self.indexOf(value) === index; // get unique team names
            });

            setAllRoles(groupTeamsOrRoles(temp));
        }
        setTabKey(key);
    }

    const getPosition = (element) => {
        var xPosition = 0;
        var yPosition = 0;
    
        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
    
        return { x: xPosition, y: yPosition };
    }

    const scrollTo = (alphabet) => {
        if(document.getElementById(alphabet)) {
            const position = getPosition(document.getElementById(alphabet));
            console.log('[alphabet]', position);
            window.scrollTo(0, position.y);
        }
    }

    useEffect(() => {
        getAllContacts();
        setTitle('Add new contact');
    }, []);

    useEffect(() => {
        console.log('[user]', user);
    }, [user]);

    useEffect(() => {
        console.log('[allContacts]', allContacts);
        if(allContacts)
            setContactGroups(groupContacts(allContacts));
    }, [allContacts]);

    useEffect(() => {
        if(contactGroups) {
            console.log('[contactGroups-1]', contactGroups);
            console.log('[contactGroups-2]', contactGroups.map((item) => item[0]));
            setContactsAlphabet(contactGroups.map((item) => item[0]));
        }
    }, [contactGroups]);

    useEffect(() => {
        if(allTeams) {
            console.log('[allTeams-1]', allTeams);
            console.log('[allTeams-2]', allTeams.map((item) => item[0]));
            setTeamsAlphabet(allTeams.map((item) => item[0]));
        }
    }, [allTeams]);

    useEffect(() => {
        if(allRoles) {
            console.log('[allRoles-1]', allRoles);
            console.log('[allRoles-2]', allRoles.map((item) => item[0]));
            setRolesAlphabet(allRoles.map((item) => item[0]));
        }
    }, [allRoles]);

    useEffect(() => {
        const deleteListener = API.graphql(
            graphqlOperation(onDeleteContacts, { owner: user.attributes.sub })
        ).subscribe({
            next: (contactsData) => {
                const deletedContact = contactsData.value.data.onDeleteContacts;

                const updatedContacts = allContacts.filter((contact) => contact.id !== deletedContact.id);
                setAllContacts(updatedContacts);
            }
        });

        const createListener = API.graphql(
            graphqlOperation(onCreateContacts, { owner: user.attributes.sub })
        ).subscribe({
            next: (contactsData) => {
                const createdContact = contactsData.value.data.onCreateContacts;

                setAllContacts([...allContacts, createdContact]);
            }
        });

        const updateListener = API.graphql(
            graphqlOperation(onUpdateContacts, { owner: user.attributes.sub })
        ).subscribe({
            next: (contactsData) => {
                const updatedContact = contactsData.value.data.onUpdateContacts;
        
                const updatedContacts = allContacts.map((contact) => {
                    if(contact.id === updatedContact.id) return updatedContact;
                    else return contact;
                })
        
                setAllContacts(updatedContacts);
            }
        });

        return function cleanup() {
            deleteListener.unsubscribe();
            createListener.unsubscribe();
            updateListener.unsubscribe();
        }
    }, [allContacts, user.attributes.sub]);

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

            <Tabs activeKey={tabKey} onSelect={(key) => tabSelectHandler(key)} id="controlled-tab">
                <Tab eventKey="name" title="NAME">
                    <div className="accordion-toggler">
                        <NavLink to="#" className={`${bodyShow ? 'down' : 'up'}`} onClick={() => { setBodyShow(!bodyShow) }}>
                            <ChevronDown />
                        </NavLink>
                    </div>

                    <div className={`contacts-wrapper accordion-body ${bodyShow ? 'show' : 'hide'}`}>
                        <div className="alphabet-wrapper">
                            {
                                contactsAlphabet ? (
                                    alphabet.map((item, index) => {
                                        if(contactsAlphabet.includes(item))
                                            return <NavLink to={`/dashboard`} onClick={() => scrollTo(`contact-${item}`)} key={index}>{item}</NavLink>
                                        else
                                            return <NavLink to={`/dashboard`} className="disabled" key={index}>{item}</NavLink>
                                    })
                                ) : null
                            }
                        </div>
                        <ContactsContainer
                            onEditRequest={editRequestHandler} 
                            allContacts={contactGroups} 
                            handleDeleteContact={handleDeleteContact}
                        />
                    </div>
                </Tab>
                <Tab eventKey="team" title="TEAM NAME">
                    <div className="accordion-toggler">
                        <NavLink to="#" className={`${bodyShow ? 'down' : 'up'}`} onClick={() => { setBodyShow(!bodyShow) }}>
                            <ChevronDown />
                        </NavLink>
                    </div>

                    <div className={`teams-wrapper accordion-body ${bodyShow ? 'show' : 'hide'}`}>
                        <div className="alphabet-wrapper">
                            {
                                teamsAlphabet ? (
                                    alphabet.map((item, index) => {
                                        if(teamsAlphabet.includes(item))
                                            return <NavLink to={`/dashboard`} onClick={() => scrollTo(`team-${item}`)} key={index}>{item}</NavLink>
                                        else
                                            return <NavLink to={`/dashboard`} className="disabled" key={index}>{item}</NavLink>
                                    })
                                ) : null
                            }
                        </div>

                        <TeamsContainer allTeams={allTeams} />
                    </div>
                </Tab>
                <Tab eventKey="role" title="ROLE">
                    <div className="accordion-toggler">
                        <NavLink to="#" className={`${bodyShow ? 'down' : 'up'}`} onClick={() => { setBodyShow(!bodyShow) }}>
                            <ChevronDown />
                        </NavLink>
                    </div>

                    <div className={`roles-wrapper accordion-body ${bodyShow ? 'show' : 'hide'}`}>
                        <div className="alphabet-wrapper">
                            {
                                rolesAlphabet ? (
                                    alphabet.map((item, index) => {
                                        if(rolesAlphabet.includes(item))
                                            return <NavLink to={`/dashboard`} onClick={() => scrollTo(`role-${item}`)} key={index}>{item}</NavLink>
                                        else
                                            return <NavLink to={`/dashboard`} className="disabled" key={index}>{item}</NavLink>
                                    })
                                ) : null
                            }
                        </div>

                        <RolesContainer allRoles={allRoles} />
                    </div>
                </Tab>
            </Tabs>

        </Aux>
    );
}

export default Dashboard;