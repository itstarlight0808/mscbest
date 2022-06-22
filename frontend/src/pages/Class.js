import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";

import ClassAd from "../components/ClassAd";
import Quote from "../components/QuoteComponent";
import FrequentlyQuestion from "../components/FrequentlyQuestion";

import TeacherAvatar from "../assets/images/avatars/teacher@3x3.png";
import ClassThumb from "../assets/images/class/class-image.png";

const Class = props => {
    return (
        <div className="class-detailed">
            <ClassAd />
            <div className="main-container">
                <Quote 
                    writer="Vince Lombardi"
                    quote="There's no such thing as Perfection. But, in striving for perfection, we can achieve excellence."
                />
                <div className="down-triangle"></div>
                <div className="class-info-container">
                    <div className="info-section">
                        <div className="info-header">
                            <div className="class-name">
                                <img src={TeacherAvatar} alt="teacher avatar" />
                                <span>“Meisner with Music” - Master Class</span>
                            </div>
                            <div className="teacher-name">
                                <span>Teacher: Holly Hylton</span>
                            </div>
                            <div className="class-description">
                                <span className="description-header">Class Description</span>
                                <br/>
                                <span className="description-body">
                                    A Professional, Advanced Student and Beginner Student Level Master Class Consisting of 4 Online Zoom Sessions 
                                    The Class will begin with a 30 minute warm up with targeted basic Meisner exercises. 
                                    Each active participant will have approximately 20 minutes every session to work on songs of your 
                                    choosing as well as observing the other participants work on their material for the remainder of the time. 
                                    You will learn to apply the Meisner Technique in your storytelling through song and Holly will help you develop 
                                    a set of tools to approach your material. Bring your current audition material, build your audition book, 
                                    work on something you always wanted to work on, sharpen your audition skills, ... it’s your choice. 
                                    This master class is to help you streamline your approach to material and to keep your creative juices flowing. 
                                    The thinking actor is a working actor! 
                                </span>
                            </div>
                        </div>
                        <div className="ctrl-container">
                            <button className="btn btn-play"><FontAwesomeIcon icon="far fa-play-circle" />Watch Video</button>
                            <button className="btn btn-orange">Get Started</button>
                            <button className="btn btn-share"><FontAwesomeIcon icon="far fa-paper-plane"/>Share with friends</button>
                        </div>
                        <div className="info-body">
                            <div className="img-container">
                                <div>
                                    <img src={ClassThumb} alt="Class Image"/>
                                    <div className="ctrl-container">
                                        <button className="btn btn-orange">Get Started</button>
                                        <button className="btn btn-play"><FontAwesomeIcon icon="fas fa-play-circle" />Watch Video</button>
                                    </div>
                                </div>
                            </div>
                            <div className="class-structure">
                                <h3 className="title">Class structure</h3>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Meet &amp; Greet</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                            quis nostrud exercitation ullamco laboris nisi ut 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Introduction to</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                            when an unknown printer took 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Warm up</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                            when an unknown printer took 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Personal time</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                            when an unknown printer took 
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                        <div className="info-footer">
                            <div className="info-list">
                                <h4>
                                    <span>Class Level: </span>Professional
                                </h4>
                                <h4>
                                    <span>Price: </span>Active Participants: 150€, Passive Participants: 50€
                                </h4>
                                <h4>
                                    <span>Class Length: </span>4 Online Zoom Sessions, over period of 4 weeks, 3 hours per session, total of 12 Hours
                                </h4>
                                <h4>
                                    <span>Class Dates: </span>Register by March 31, 2022, Class begin April 7, 2022
                                </h4>
                                <h4>
                                    <span>Number of Participants: </span>4 Groups, Groups are limited to 6 active participants and 5 passive participants.
                                </h4>
                            </div>
                            <div className="class-reserve-status">
                                <div className="title">
                                    <span className="reserved">Reserved</span>
                                    <span className="divider">/</span>
                                    <span className="available">Available</span>
                                </div>
                                <div className="availability">
                                    <span>availability</span>
                                </div>
                                <div className="status">
                                    <span className="reserved">45</span>
                                    <span className="divider">/</span>
                                    <span className="available">3</span>
                                </div>
                                <div className="footer">
                                    <span>Reserve your spot</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="up-triangle"></div>
            </div>
            <FrequentlyQuestion />
        </div>
    );
}

export default Class;