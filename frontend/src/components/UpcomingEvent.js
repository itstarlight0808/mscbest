import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SheetMusicImage from "../assets/images/components/upcoming-events/sheet_music.png";
import StageImage from "../assets/images/components/upcoming-events/stage.png";
import SingingImage from "../assets/images/components/upcoming-events/singing.png";
import LearningImage from "../assets/images/components/upcoming-events/learning.png";
import PinkRightArrowBtn from "../assets/images/home/pink-right-arrow.svg";

const UpcomingEvent = props => {
    return (
        <div className="event-section">
            <div className="event-section-content">
                <div className="title">
                    Upcoming <i>Events</i>
                </div>
                <div className="description">
                    <span>
                    Overview of latest upcoming events. Discover our scheduled bootcamps, workshops, masterclasses and other relevant informations.
                    </span>
                </div>
                <div className="ctrl-container">
                    <Link to="/class" className="btn btn-white">View All Events <img src={PinkRightArrowBtn}/></Link>
                </div>
            </div>
            <div className="event-img-container">
                <img src={SheetMusicImage} alt="upcoming events"/>
                <img src={StageImage} alt="upcoming events"/>
                <img src={SingingImage} alt="upcoming events"/>
                <img src={LearningImage} alt="upcoming events"/>
            </div>
        </div>
    );
}

export default UpcomingEvent;