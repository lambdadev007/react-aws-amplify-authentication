import React from 'react';

const Team = props => {
    return (
        <tr className="unread">
            <td>{props.team}</td>
        </tr>
    );
}

export default Team;