import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import moment from "moment";

import { CONFIG } from "../config/index";
import { classType, classLevel } from "../utils/common";

import NoImage from "../assets/images/no_image1x1.png";

const ClassDetailComponent = ({ curClass }) => {
    const { userInfo } = useSelector(state => state.user);
    const teacher = curClass.teacher;
    let level = curClass.level?.map(lv => classLevel[lv]);
    level = level? level.join(", "): "";
    let groupPrice = curClass.groups?.map(one => `${one.name}: ${one.price}€`);
    groupPrice = groupPrice? groupPrice.join(", "): "";
    const reservedCount = curClass.participants? curClass.participants.length: 0;
    const availableCount = (curClass.numberOfParticipants ?? 0) - reservedCount;

    return (
        <div className="c-class-detail">
            <div className="down-triangle"></div>
            <div className="class-info-container">
                <div className="info-section">
                    <div className="info-header">
                        <div className="class-name">
                            { teacher?.avatar ? <Avatar alt="avatar" src={`${CONFIG.serverPath}${teacher.avatar}`} />
                                : <FontAwesomeIcon icon="fas fa-user-tie" />
                            }
                            <span>“{ curClass.name }” - { classType[curClass.type]?.name }</span>
                        </div>
                        <div className="teacher-name">
                            <span>Teacher: { `${teacher?.firstName} ${teacher?.lastName}` }</span>
                        </div>
                        <div className="class-description">
                            <span className="description-header">Class Description</span>
                            <br/>
                            <span className="description-body">
                                { curClass.description }
                            </span>
                        </div>
                    </div>
                        <div className="ctrl-container">
                            <button className="btn btn-play"><FontAwesomeIcon icon="far fa-play-circle" /><span>Watch Video</span></button>
                            {
                                (!userInfo || (userInfo?.accountType === 0)) &&
                                <>
                                    <button className="btn btn-orange">Get Started</button>
                                    <button className="btn btn-share"><FontAwesomeIcon icon="far fa-paper-plane"/><span>Share with friends</span></button>
                                </>
                            }
                        </div>
                    <div className="info-body">
                        <div className="img-container">
                            <div>
                                <img src={ curClass.banner? `${CONFIG.serverPath}${curClass.banner}`: NoImage } alt="Class Image"/>
                                <div className="ctrl-container">
                                    {
                                        (!userInfo || (userInfo?.accountType === 0)) &&
                                        <button className="btn btn-orange">Get Started</button>
                                    }
                                    <button className="btn btn-play"><FontAwesomeIcon icon="fas fa-play-circle" /><span>Watch Video</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="class-structure">
                            <h3 className="title">Class structure</h3>
                            <Accordion defaultActiveKey={0}>
                                {
                                    curClass.structure?.map((one, index) => {
                                        return (
                                            <Accordion.Item key={`structure_item_${index}`} eventKey={index}>
                                                <Accordion.Header>{ one.name }</Accordion.Header>
                                                <Accordion.Body>
                                                    { one.description }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>
                        </div>
                    </div>
                    <div className="info-footer">
                        <div className="info-list">
                            <h4>
                                <span>Class Level: </span>
                                { level }
                            </h4>
                            <h4>
                                <span>Price: </span>
                                { groupPrice }
                            </h4>
                            <h4>
                                <span>Class Length: </span>
                                { curClass.lengthDescription }
                            </h4>
                            <div className="schedule-container">
                                <h4>Class Dates: </h4>
                                <div className="schedule-list">
                                    <span>{ `Registered by ${moment(curClass.createdAt).format("LL")}` }</span>
                                    {
                                        curClass.schedule?.map((schedule, index) => {
                                            let startDate = moment(schedule.startDate).format("YYYY-MM-DD HH:mm:ss A");

                                            return (
                                                <div key={`schedule_item_${index}`} className="schedule-item">
                                                    Date: { startDate }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <h4>
                                <span>Number of Participants: </span>
                                { curClass.numberOfParticipants }
                            </h4>
                        </div>
                        <div>
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
                                    <span className="reserved">{ reservedCount }</span>
                                    <span className="divider">/</span>
                                    <span className="available">{ availableCount }</span>
                                </div>
                                <div className="footer">
                                    <span>Reserve your spot</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="up-triangle"></div>
        </div>
    );
}

export default ClassDetailComponent;