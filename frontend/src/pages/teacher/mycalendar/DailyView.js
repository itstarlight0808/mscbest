import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { List, ListItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { isSameByYearMonthDay, omitStringByWords, classType } from "../../../utils/common";
import { cancelBookingAPI, deleteClassScheduleAPI } from "../../../store/slices/classSlice";
import BookDialog from "../../../components/BookDialog";

const DailyView = props => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const { classList } = useSelector(state => state.classes);
    
    const selectedDate = props.selectedDate;
    const todoList = [];
    classList.forEach(oneClass => {
        oneClass.schedule.forEach(oneSchedule => {
            let startDate = moment(oneSchedule.startDate);
            if(isSameByYearMonthDay(selectedDate, startDate)) {
                if( todoList.length === 0 || (todoList.length > 0 && todoList[todoList.length-1].id !== oneClass.id) )
                    todoList.push({...oneClass, schedule: [oneSchedule]});
                else
                    todoList[todoList.length-1].schedule.push(oneSchedule);
            }
        })
    })
    const maxLength = 100;
    const [isExpandedList, setIsExpandedList] = useState(new Array(todoList.length).fill(false));
    const onMoreClickEvent = (e, index) => {
        let tmp = [...isExpandedList];
        tmp[index] = true;

        setIsExpandedList(tmp);

        e.preventDefault();
        e.stopPropagation();
    }
    const deleteSchedule = (classId, scheduleId) => {
        let selected = classList.findIndex(one => one.id === classId);
        dispatch(deleteClassScheduleAPI({ selected, scheduleId }));
    }

    const cancelBooking = classId => {
        dispatch(cancelBookingAPI({ classId }));
    }

    const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
    const [selClass, setSelClass] = useState({});
    const bookClass = one => {
        setSelClass(one);
        setIsBookDialogOpen(true);
    }

    return (
        <div className="c-daily-view">
            <List className="class-list-container">
                {
                    todoList.map((one, index) => {
                        const isExpanded = isExpandedList[index];
                        const shortDescription = isExpanded? one.shortDescription: omitStringByWords(one.shortDescription, maxLength);
                        const reservedCount = one.participants.length;
                        const availableCount = one.numberOfParticipants - reservedCount;
                        
                        return (
                            <ListItem
                                key={`class_item_${index}`}
                                className="class-item"
                            >
                                <div className="w-100">
                                    <div className="d-flex">
                                        <div style={{ background: classType[one.type].color, padding: 10 }}></div>
                                        <h2 className="title ms-3">
                                            {one.name}
                                        </h2>
                                    </div>
                                    <div className="description-container">
                                        <p className="short-description">
                                            {shortDescription}
                                            { !isExpanded && one.shortDescription.length > maxLength && 
                                                <button className="btn btn-more" onClick={event => onMoreClickEvent(event, index)}>more</button>
                                            }
                                        </p>
                                        <div className="schedule-list">
                                            { one.schedule.length > 0 && <div>Starting</div> }
                                            <div>
                                                {
                                                    one.schedule.map((oneSchedule, scheduleIndex) => {
                                                        let startDate = moment(oneSchedule.startDate).format("YYYY-MM-DD HH:mm:ss A");
                                                        return (
                                                            <div className="schedule-item" key={`schedule-item-${scheduleIndex}`}>
                                                                <span>Date: { startDate }</span>
                                                                { (userInfo.accountType === 1 || userInfo.isAdmin === true) &&
                                                                    <FontAwesomeIcon icon="fas fa-trash" onClick={() => deleteSchedule(one.id, oneSchedule.id)} />
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        { userInfo.accountType === 0 &&
                                            <div className="reserve-container">
                                                <div className="status">
                                                    <span className="reserved">{reservedCount}</span>
                                                    <span className="divider">/</span>
                                                    <span className="available">{availableCount}</span>
                                                </div>
                                                { userInfo.accountType === 0 &&
                                                    <>
                                                        { one.isBooked? <button className="btn btn-orange outline m-auto" onClick={() => cancelBooking(one.id)}>CANCEL BOOKING</button>
                                                            : (availableCount? <button className="btn btn-orange m-auto" onClick={() => bookClass(one)}>Book Class</button>
                                                            : <button className="btn btn-orange outline m-auto" disabled>Class Is Full</button>)
                                                        }
                                                    </>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </ListItem>
                        )
                    })
                }
            </List>
            <BookDialog isOpen={isBookDialogOpen} setIsOpen={setIsBookDialogOpen} selClass={selClass} />
        </div>
    )
}

export default DailyView;