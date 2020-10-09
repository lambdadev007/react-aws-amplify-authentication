import React from 'react';

const Role = props => {
    return (
        <tr className="unread">
            <td>{props.role}</td>
        </tr>
    );
}

export default Role;