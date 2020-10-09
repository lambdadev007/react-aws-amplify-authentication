import React from 'react';

const Team = props => {
    if (!props.allTeams) return <div className="text-center"><p>Loading...</p></div>
    return (
        props.allTeams.map((team, index) => {
            return (
                <div key={index} className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="media-body">
                        <h6 className="m-0 d-inline">{team}</h6>
                        {/* <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span> */}
                    </div>
                </div>
            )
        })
    )
};

export default Team;