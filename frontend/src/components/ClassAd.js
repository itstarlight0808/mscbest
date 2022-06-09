import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TeacherImage from "../assets/images/components/class-ad/teacher.png";

const ClassAd = props => {
    return (
        <div className="class-advertisement">
            <div className="img-container">
                <img src={TeacherImage} alt="Teacher Image"/>
            </div>
            <div className="class-advertisement-section">
                <div className="description">
                    <span>
                        Learn from the BEST - Experience live online masterclasses with the 
                        professionals from musical Industry
                    </span>
                </div>
                <h1 className="title">
                    “Meisner with Music”
                    master class
                </h1>
                <div className="ctrl-container">
                    <button className="btn btn-orange">Get Started</button>
                    <button className="btn btn-play"><FontAwesomeIcon icon="far fa-play-circle" />Watch Video</button>
                </div>
            </div>
        </div>
    );
}

export default ClassAd;