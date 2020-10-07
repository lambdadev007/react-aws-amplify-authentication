import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';

import Aux from '../../../hoc/_Aux/index';
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
        <Aux>
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
                                        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-play normal fa-w-14 fa-3x">
                                            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z" className=""></path>
                                        </svg>

                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-play hover fa-w-14 fa-3x">
                                            <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" className=""></path>
                                        </svg>
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
        </Aux>
    );
};

export default HomePage;