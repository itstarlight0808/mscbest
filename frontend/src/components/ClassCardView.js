import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { CONFIG } from "../config";
import { classType } from "../utils/common";
import { cancelBookingAPI } from "../store/slices/classSlice";
import BookDialog from "../components/BookDialog";

import NoImage from "../assets/images/no_image1x1.png";

const ClassCardView = ({ selClass }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const teacher = selClass.teacher;
    const reservedCount = selClass.participants.length;
    const availableCount = selClass.numberOfParticipants - reservedCount;

    const cancelBooking = () => {
        dispatch(cancelBookingAPI({ classId: selClass.id }));
    }

    const goToClassPage = () => {
        history.push(`/class/${selClass.id}`);
    }

    const goToClassDetailPage = () => {
        history.push(`/class/${selClass.id}/detail`);
    }

    return (
        <div className="class-card-view">
            <div className="banner" onClick={() => goToClassPage()}>
                <img src={selClass.banner? `${CONFIG.serverPath}${selClass.banner}`: NoImage} />
                <div className="title">
                    <h3>{ selClass.name }</h3>
                    <h4>{ classType[selClass.type].name }</h4>
                </div>
            </div>
            <div className="body">
                <div className="avatar-container">
                    { teacher.avatar ? <Avatar alt="avatar" src={`${CONFIG.serverPath}${teacher.avatar}`} />
                        : <FontAwesomeIcon icon="fas fa-user-tie" />
                    }
                    <span>{ `${teacher.firstName} ${teacher.lastName}` }</span>
                </div>
                <h3 className="class-title">{ selClass.name }</h3>
                <p className="short-description">{ selClass.shortDescription }</p>
                <div className="schedule-list">
                    { selClass.schedule.length > 0 && <div>Starting</div> }
                    <div>
                        {
                            selClass.schedule.map((one, index) => {
                                let startDate = moment(one.startDate).format("YYYY-MM-DD HH:mm:ss A");
                                return (
                                    <div className="schedule-item" key={`schedule-item-${index}`}>
                                        <span>Date: { startDate }</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>    
            </div>
            <div className="footer">
                <div className="btn-ctrl-container">
                    <span className="btn-class-info" onClick={() => goToClassDetailPage()}><FontAwesomeIcon className="me-2" icon="fas fa-info"/>CLASS INFO</span>
                    { (!userInfo || userInfo?.accountType === 0) &&
                        <>
                            { selClass.isBooked? <button className="btn btn-orange outline m-auto" onClick={() => cancelBooking()}>CANCEL YOUR BOOKING</button>
                                : (availableCount? <button className="btn btn-orange m-auto" onClick={() => setIsOpen(true)}>Get Started</button>
                                : <button className="btn btn-orange outline m-auto" disabled>Get Started</button>)
                            }
                        </>
                    }
                </div>
                <div className="availability-container">
                    <div className="class-reserve-status">
                        <div className="availability">
                            <span>class availability</span>
                        </div>
                        <div className="title">
                            <span className="reserved">Reserved</span>
                            <span className="divider">/</span>
                            <span className="available">Available</span>
                        </div>
                        <div className="status">
                            <span className="reserved">{reservedCount}</span>
                            <span className="divider">/</span>
                            <span className="available">{availableCount}</span>
                        </div>
                        <div className="footer">
                            <span>Reserve your spot</span>
                        </div>
                    </div>
                    { (!userInfo || userInfo?.accountType === 0) && 
                        <div className={`book-status ${selClass.isBooked? "reserved": (availableCount? "reserve": "full")}`}>
                            <FontAwesomeIcon icon="far fa-calendar-days" />
                            <h6>
                                { selClass.isBooked? "BOOKED BY YOU": (availableCount? "RESERVE YOUR SPOT": "CLASS IS FULL") }
                            </h6>
                        </div>
                    }
                </div>
            </div>
            { (!userInfo || userInfo?.accountType === 0) && 
                <BookDialog isOpen={isOpen} setIsOpen={setIsOpen} selClass={selClass} />
            }
        </div>
    );
}

export default ClassCardView;