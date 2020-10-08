import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import { Play } from 'react-feather';

import AuthAux from '../../../hoc/_Aux/auth';
import Navbar from '../../layout/HomeLayout/Navbar';
import './index.scss';
import banner from '../../../assets/images/banner.jpg';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        zIndex: '20'
    }
};

Modal.setAppElement('#root');

const HomePage = () => {
    const videoUrl = '//player.vimeo.com/video/287684225?api=false&autopause=true&autoplay=true&byline=true&loop=false&portrait=true&title=true&xhtml=false';
    const [modalIsOpen,setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        console.log('[modal opened]');
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <AuthAux>
            <Navbar />

            <section className="container" id="home">
                <div className="main">
                    <div className="align-items-center row p-4">
                        <div className="col-md-7 col-lg-6">
                            <div className="title-heading mt-4">
                                <h1 className="heading mb-3">Your ultimate contacts book!</h1>
                                <h4 className="para-desc text-muted">
                                    Some custom text will go here
                                </h4>
                                <div className="mt-4 d-flex align-items-center justify-content-center">
                                    <NavLink className="btn btn-primary rounded mx-3" to="/auth/register">
                                        Signup
                                    </NavLink>
                                    <NavLink className="btn btn-primary rounded mx-3" to="/auth/login">
                                        Login
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-2 mt-sm-0 pt-sm-0 col-md-5 col-lg-6">
                            <div className="position-relative">
                                <img src={banner} className="rounded img-fluid mx-auto d-block" alt="" />
                                <div className="play-icon">
                                    <NavLink className="play-btn video-play-icon" to="#" onClick={() => openModal()}>
                                        <Play />
                                    </NavLink>
                                </div>

                                <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                                >
                                    <iframe
                                     width="460" 
                                     height="230" 
                                     src={videoUrl} 
                                     frameBorder="0" 
                                     allowFullScreen="" 
                                     title="video" 
                                     tabIndex="-1">
                                    </iframe>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthAux>
    );
};

export default HomePage;