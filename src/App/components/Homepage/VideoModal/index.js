import React from 'react';
import { NavLink } from 'react-router-dom';

const VideoModal = ({showModal}) => {
    return (
        <>
            {
                showModal ? (
                    <div className="video-modal">
                        <div className="video-modal-wrapper">
                            <div className="close-btn-wrapper">
                                <NavLink to="#" className="close-btn" />
                            </div>
                            
                            <div className="modal-body">
                                <iframe width="460" height="230" src="//player.vimeo.com/video/287684225?api=false&autopause=true&autoplay=true&byline=true&loop=false&portrait=true&title=true&xhtml=false" frameborder="0" allowfullscreen="" title="video" tabindex="-1"></iframe>
                            </div>
                            
                        </div>
                    </div>
                ) : null
            }

        </>
    );
};

export default VideoModal;