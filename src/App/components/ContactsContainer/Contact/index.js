import React, { useContext } from 'react';
import Female from '../../../../assets/images/user/avatar-1.jpg';
import Male from '../../../../assets/images/user/avatar-2.jpg';
import { Mail, Smartphone, UserMinus, Edit } from 'react-feather';

import { CognitoAuthUserContext } from "../../../index";

const Contact = props => {
    const user = useContext(CognitoAuthUserContext);

    return (
        <tr className="unread" key={props.contact.id}>
            <td>
                {props.contact.Gender === 'Female' ?
                    <img className="rounded-circle" style={{ width: '40px' }} src={Female} alt="activity-user" />
                    :
                    <img className="rounded-circle" style={{ width: '40px' }} src={Male} alt="activity-user" />
                }
            </td>
            <td>
                <h6 className="mb-1">{//<SpeakIt nameToAudio={contact.Name} />}{' '}
                }
                    {props.contact.Name}</h6>
                <p className="m-0">{props.contact.TeamName} | {props.contact.Role}</p>
            </td>
            <td>
                <h6 className="mb-1"><Mail color="orange" size="15" />{' '}{props.contact.Email}</h6>
                <p className="m-0"><Smartphone color="orange" size="15" />{' '}{props.contact.Phone}</p>
            </td>
            <td className="d-flex justify-content-end">
                {
                    user.attributes.sub === props.contact.owner ? (
                        <>
                            <button className="btn btn-outline-primary" onClick={() => props.onEditRequest(props.contact.id)}><Edit /></button>
                            <button onClick={() => props.handleDeleteContact(props.contact.id)} className="btn btn-outline-danger"><UserMinus /></button>
                        </>
                    ) : null
                }
            </td>
        </tr>
    );
}

export default Contact;