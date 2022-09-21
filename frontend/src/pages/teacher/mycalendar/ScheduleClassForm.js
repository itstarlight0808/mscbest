import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem } from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { enUS } from "date-fns/locale";
import moment from "moment";

import { omitStringByWords, classType } from "../../../utils/common";
import { CONFIG } from "../../../config/index";
import { addClassScheduleAPI, deleteClassScheduleAPI } from "../../../store/slices/classSlice";

import NoImage from "../../../assets/images/no_image1x1.png";

const ScheduleClassForm = props => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user)
    const { classList } = useSelector(state => state.classes);
    
    const maxLength = 100;
    const [isExpandedList, setIsExpandedList] = useState(new Array(classList.length).fill(false));
    const onMoreClickEvent = (e, index) => {
        let tmp = [...isExpandedList];
        tmp[index] = true;

        setIsExpandedList(tmp);

        e.preventDefault();
        e.stopPropagation();
    }
    const [selected, setSelected] = useState(null);

    const deleteSchedule = scheduleId => {
        dispatch(deleteClassScheduleAPI({ selected, scheduleId }));
    }
    const [isOpen, setIsOpen] = useState(false);
    const addScheduleEvent = () => {
        dispatch(addClassScheduleAPI({ classId: classList[selected].id, startDate: selectedDate }));
    }
    const [selectedDate, setSelectedDate] = useState(moment());

    return (
        <div className="c-schedule-class-form">
            <button type="button" className="btn-ctrl btn-ctrl-purple back-btn" onClick={() => props.setMode("view")}>
                <FontAwesomeIcon icon="fas fa-arrow-left" />
            </button>
            <div className="form-content">
                <List className="class-list-container">
                    {
                        classList.map((one, index) => {
                            const isExpanded = isExpandedList[index];
                            const shortDescription = isExpanded? one.shortDescription: omitStringByWords(one.shortDescription, maxLength);
                            
                            return (
                                <ListItem
                                    onClick={() => setSelected(index)}
                                    key={`class_item_${index}`}
                                    className={`class-item ${selected === index? "active": ""}`}
                                >
                                    <div>
                                        <h2 className="title">{one.name}</h2>
                                        <p className="short-description">
                                            {shortDescription}
                                            { !isExpanded && one.shortDescription.length > maxLength && 
                                                <button className="btn btn-more" onClick={event => onMoreClickEvent(event, index)}>more</button>
                                            }
                                        </p>
                                    </div>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <div className="class-preview-card">
                    { selected === null &&
                        <div className="preview-placeholder">
                            <h2>Preview</h2>
                        </div>
                    }
                    { selected !== null && 
                        <>
                            <div className="banner">
                                <img src={classList[selected].banner? `${CONFIG.serverPath}${classList[selected].banner}`: NoImage} />
                                <div className="title">
                                    <h3>{ classList[selected].name }</h3>
                                    <h4>{ classType[classList[selected].type].name }</h4>
                                </div>
                            </div>
                            <div className="body">
                                <div className="avatar-container">
                                    { userInfo.avatar ? <Avatar alt="avatar" src={`${CONFIG.serverPath}${userInfo.avatar}`} />
                                        : <FontAwesomeIcon icon="fas fa-user-tie" />
                                    }
                                    <span>{ `${userInfo.firstName} ${userInfo.lastName}` }</span>
                                </div>
                                <h3 className="class-title">{ classList[selected].name }</h3>
                                <p className="short-description">{ classList[selected].shortDescription }</p>
                                <div className="schedule-list">
                                    { classList[selected].schedule.length > 0 && <div>Starting</div> }
                                    <div>
                                        {
                                            classList[selected].schedule.map((one, index) => {
                                                let startDate = moment(one.startDate).format("YYYY-MM-DD HH:mm:ss A");
                                                return (
                                                    <div className="schedule-item" key={`schedule-item-${index}`}>
                                                        <span>Date: { startDate }</span>
                                                        <FontAwesomeIcon icon="fas fa-trash" onClick={() => deleteSchedule(one.id)} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>    
                            </div>
                            <div className="footer">
                                <button className="btn btn-add-schedule" onClick={() => setIsOpen(true)}>
                                    <FontAwesomeIcon icon="fas fa-square-plus"/> Add Date &amp; Time
                                </button>
                            </div>
                        </>
                    }
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="adding-schedule-dialog">
                        <DialogTitle>Add Schedule</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please select starting date of the class. You can schedule your class with multiple days.
                            </DialogContentText>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    label="Date picker"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(moment(e))}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    className="ms-4"
                                    margin="normal"
                                    label="Time picker"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(moment(e))}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => addScheduleEvent()} variant="contained" color="primary">
                                Save
                            </Button>
                            <Button onClick={() => setIsOpen(false)} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ScheduleClassForm;