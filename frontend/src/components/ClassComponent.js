import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import ClassHeaderImage from "../assets/images/components/class-component/class-header.png";
import TeacherAvatar from "../assets/images/avatars/teacher.png";

const ClassComponent = props => {
    let classInfo = props.classInfo;
    const history = useHistory();

    const goToClassDetail = () => {
        history.push("/class/1");
    }
    return (
        <div className="class-component">
            <div className="info-container" onClick={() => goToClassDetail()}>
                <img src={ClassHeaderImage} alt="class header image"/>
            </div>
            <div className="detail-container">
                <div className="teacher-avatar">
                    <img src={TeacherAvatar} alt="teacher avatar"/>
                    <span>{classInfo.name}</span>
                </div>
                <h3 className="subtitle">{classInfo.subtitle}</h3>
                <div className="description">
                    <span>
                        {classInfo.description}
                    </span>
                </div>
                <div className="date">
                    <span>Date: {classInfo.date}</span>
                </div>
                <div className="ctrl-container">
                    <span>CLASS INFO</span>
                    <button className="btn btn-orange">Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default ClassComponent;