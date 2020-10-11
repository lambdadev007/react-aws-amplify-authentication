import React from 'react';
import { ArrowUp } from 'react-feather';
import { NavLink } from 'react-router-dom';
import Team from './Team'

const TeamsContainer = props => {
    if (!props.allTeams) return (
        <div>
            <p className="text-center">Loading...</p>
        </div>
    )

    if (props.allTeams.length === 0) return (
        <div>
            <p className="text-center">No teams found</p>
        </div>  
    )

    return props.allTeams.map((teams) => {
        return (
            <div className="card Recent-Users" key={teams[0]}>
                <div className="card-header" id={`team-${teams[0]}`}>
                    <h5 style={{textTransform: "uppercase"}}>{teams[0]}</h5>

                    <div className="arrow-wrapper">
                        <NavLink to="#" onClick={() => { window.scrollTo(0, 0); }}>
                            <ArrowUp />
                        </NavLink>
                    </div>
                </div>
                <div className="card-block px-0 py-3">
                    <div className="table-responsive px-4">
                        <table className="table table-hover mb-0">
                            <tbody>
                                {
                                    teams[1].map((team, index) =>
                                        <Team
                                            key={index}
                                            team={team}
                                        />
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    });
};

export default TeamsContainer;