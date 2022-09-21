import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { enUS } from "date-fns/locale";

import ScheduleClassForm from "./ScheduleClassForm";
import DailyView from "./DailyView";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";
import { getClassListAPI } from "../../../store/slices/classSlice";

const MyCalendar = props => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    
    const [mode, setMode] = useState("view");
    const [calendarView, setCalendarView] = useState("month");
    const [selectedDate, setSelectedDate] = useState(moment());
    console.log("*******", selectedDate)

    useEffect(() => {
        dispatch(getClassListAPI);
    }, [])
    const prevDate = () => {
        if(calendarView === "month")
            setSelectedDate(moment(selectedDate).subtract(1, "months"));
        else if(calendarView === "week")
            setSelectedDate(moment(selectedDate).subtract(1, "weeks"));
        else
            setSelectedDate(moment(selectedDate).subtract(1, "days"))
    }
    const nextDate = () => {
        console.log(calendarView)
        if(calendarView === "month")
            setSelectedDate(moment(selectedDate).add(1, "months"))
        else if(calendarView === "week")
            setSelectedDate(moment(selectedDate).add(1, "weeks"))
        else
            setSelectedDate(moment(selectedDate).add(1, "days"))
    }

    return (
        <div className="c-calendar-container">
            { mode === "view" && 
                <>
                    <div className="d-flex mb-2">
                        { (userInfo.accountType === 1 || userInfo.isAdmin === true) &&
                            <>
                                <button
                                    className="btn-ctrl btn-ctrl-purple"
                                    onClick={() => setMode("schedule_class")}
                                >
                                    <FontAwesomeIcon icon="far fa-square-plus" />New Event
                                </button>
                                <button
                                    className="btn-ctrl btn-ctrl-purple mx-2"
                                    onClick={() => editClassEvent()}
                                >
                                    <FontAwesomeIcon icon="far fa-rectangle-list" />Categories
                                </button>
                                <button
                                    className="btn-ctrl btn-ctrl-purple mx-2"
                                    onClick={() => editClassEvent()}
                                >
                                    <FontAwesomeIcon icon="fas fa-wrench" />Options
                                </button>
                                <button
                                    className="btn-ctrl btn-ctrl-purple mx-2"
                                    onClick={() => editClassEvent()}
                                >
                                    <FontAwesomeIcon icon="fas fa-print" />Print
                                </button>
                            </>
                        }
                        <button
                            className="btn-ctrl btn-ctrl-purple mx-2"
                            onClick={() => {}}
                        >
                            <FontAwesomeIcon icon="fas fa-filter" />Filter
                        </button>
                        <button
                            className="btn-ctrl btn-sync mx-2"
                            onClick={() => {}}
                        >
                            <FontAwesomeIcon icon="fas fa-arrows-rotate" />Sync
                        </button>
                    </div>
                    <div className="calendar-view-container">
                        <div className="sel-date">
                            <h3>
                                { calendarView === "day" && selectedDate.format("DD") + "th " }
                                { selectedDate.format("MMMM YYYY") }
                            </h3>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    format="MM/dd/yyyy"
                                    className="datepicker"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(moment(e))}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="calendar-view">
                            <button className="btn btn-purple" onClick={() => prevDate()}>
                                <FontAwesomeIcon icon="fas fa-chevron-left" />
                            </button>
                            <div className="view-tabs">
                                <button className={`btn-ctrl btn-cal-view ${calendarView === "day"? "active": ""}`} onClick={() => setCalendarView("day")}>
                                    Day
                                </button>
                                <button className={`btn-ctrl btn-cal-view ${calendarView === "week"? "active": ""}`} onClick={() => setCalendarView("week")}>
                                    Week
                                </button>
                                <button className={`btn-ctrl btn-cal-view ${calendarView === "month"? "active": ""}`} onClick={() => setCalendarView("month")}>
                                    Month
                                </button>
                            </div>
                            <button className="btn btn-purple" onClick={() => nextDate()}>
                                <FontAwesomeIcon icon="fas fa-chevron-right" />
                            </button>
                        </div>
                    </div>
                    <div>
                        { calendarView === "day" && 
                            <DailyView selectedDate={selectedDate} />
                        }
                        { calendarView === "week" && 
                            <WeeklyView selectedDate={selectedDate} />
                        }
                        { calendarView === "month" && 
                            <MonthlyView selectedDate={selectedDate} setSelectedDate={setSelectedDate} setCalendarView={setCalendarView} />
                        }
                    </div>
                </>    
            }
            { mode === "schedule_class" && 
                <ScheduleClassForm setMode={setMode} />
            }
            {/* { mode === "edit" && 
                <ClassForm mode={mode} setMode={setMode} selected={getClassById(selected[0])} fetchClassList={fetchClassList} />
            } */}
        </div>
    );
}

export default MyCalendar;