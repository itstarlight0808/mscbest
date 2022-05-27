import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import UpcomingEventImage from "../assets/images/home/upcoming-events.png";
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
                    <button className="btn btn-white">View All Events <img src={PinkRightArrowBtn}/></button>
                </div>
            </div>
            <div className="event-img-container">
                <img src={UpcomingEventImage} alt="upcoming events"/>
            </div>
        </div>
    );
}

export default UpcomingEvent;