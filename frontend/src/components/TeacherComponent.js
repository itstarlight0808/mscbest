import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RightArrowBtn from "../assets/images/home/right-arrow.svg";

const TeacherComponent = props => {
    let data = props.data;
    if(!data)
        return (<></>);

    const [activeTab, setActiveTab] = useState('');

    return (
        <div className="teacher-component">
            <div className={`img-container ${activeTab? 'active': ''}`}>
                <img src={data.photo} alt="teacher image"/>
            </div>
            <div className={`custom-tooltip ${activeTab? 'active': ''}`}>
                <div className="tooltip-header">
                    <h2>{data.name}</h2>
                    <div className="inline-group">
                        <div className="tabs">
                            <button className={` btn btn-tab ${activeTab === 'bio'? 'active': ''} `} onClick={() => setActiveTab('bio')}>
                                <div className="skew-div"></div>
                                <h3>BIO</h3>
                            </button>
                            <button className={` btn btn-tab ${activeTab === 'classes'? 'active': ''} `} onClick={() => setActiveTab('classes')}>
                                <div className="skew-div"></div>
                                <h3>CLASSES</h3>
                            </button>
                        </div>
                        <div className="social-links">
                            <FontAwesomeIcon icon="fab fa-facebook-f" className="social-icon" />
                            <FontAwesomeIcon icon="fab fa-twitter" className="social-icon" />
                            <FontAwesomeIcon icon="fab fa-linkedin-in" className="social-icon" />
                            <FontAwesomeIcon icon="fab fa-dribbble" className="social-icon" />
                        </div>
                    </div>
                </div>
                <div className="tooltip-body">
                    { activeTab === "bio" && <h4 className="description">{data.bio}</h4> }
                    { activeTab === "classes" && 
                        <Accordion defaultActiveKey={0}>
                            {
                                data.classes.map((one, index) => {
                                    return (
                                        <Accordion.Item eventKey={index} key={`acc_${index}`}>
                                            <Accordion.Header>{one.title}</Accordion.Header>
                                            <Accordion.Body>
                                                <span>{one.description}</span>
                                                <div className="ctrl-container">
                                                    <button className="btn btn-purple">Learn More <img src={RightArrowBtn} alt="right arrow"/></button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    );
                                })
                            }
                        </Accordion>
                    }
                </div>
            </div>
        </div>
    );
}

export default TeacherComponent;