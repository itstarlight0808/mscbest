import React, { useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { enUS } from "date-fns/locale"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Home = props => {
    let [date, setDate] = useState(new Date());
    return (
        <div className="d-home-container">
            <div className="d-home-content">
                <div className="header">
                    <div className="caption">
                        <FontAwesomeIcon icon="fas fa-calendar-days" />
                        <span> { moment(date).format("dddd") } Agenda - {moment(date).format("MM.DD.yyyy")}</span>
                    </div>
                    <div className="date-picker-container">
                        <button className="btn btn-purple" onClick={() => setDate(moment(date).subtract(1, "days"))}>
                            <FontAwesomeIcon icon="fas fa-chevron-left" />
                        </button>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
                            <KeyboardDatePicker
                                className="date-picker"
                                margin="normal"
                                format="MM/dd/yyyy"
                                value={date}
                                onChange={date => setDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                helperText={null}
                            />
                        </MuiPickersUtilsProvider>
                        <button className="btn btn-purple" onClick={() => setDate(moment(date).add(1, "days"))}>
                            <FontAwesomeIcon icon="fas fa-chevron-right" />
                        </button>
                    </div>
                </div>
                <div className="body">
                    <div className="agenda-list">
                        <div className="agenda-item">
                            <h3>20:00 to 21:00 - Class: Meisner with Music</h3>
                            <p>Student: Ann-Kathrin Veit</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="status-list">
                <div className="status-item">
                    <div className="header">
                        <FontAwesomeIcon icon="fas fa-user-tie" />
                        <h3>ACTIVE STUDENTS</h3>
                    </div>
                    <div className="body">
                        <span>30</span>
                    </div>
                </div>
                <div className="status-item">
                    <div className="header">
                        <FontAwesomeIcon icon="fas fa-bell" />
                        <h3>NOTIFICATIONS</h3>
                    </div>
                    <div className="body">
                        <span>30</span>
                    </div>
                </div>
                <div className="status-item">
                    <div className="header">
                        <FontAwesomeIcon icon="fas fa-calendar-days" />
                        <h3>LESSON LEFT THIS WEEK</h3>
                    </div>
                    <div className="body">
                        <span>30</span>
                    </div>
                </div>
                <div className="status-item">
                    <div className="header">
                        <FontAwesomeIcon icon="fas fa-square-poll-vertical" />
                        <h3>MONTHLY INCOME (PROJECTED)</h3>
                    </div>
                    <div className="body">
                        <span>600€</span>
                    </div>
                </div>
                <div className="status-item">
                    <div className="header">
                        <FontAwesomeIcon icon="fas fa-check-square" />
                        <h3>PAYMENT RECEIVED THIS MONTH</h3>
                    </div>
                    <div className="body">
                        <span>300€</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;