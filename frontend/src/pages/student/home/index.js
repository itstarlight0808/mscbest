import React, { useState, useEffect } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { enUS } from "date-fns/locale"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import httpClient from "../../../utils/http-client";

const Home = props => {
    let [date, setDate] = useState(moment());
    const [upcomingClassesCnt, setUpcomingClassesCnt] = useState(0);
    const [agendaList, setAgendaList] = useState([]);

    useEffect(() => {
        httpClient.get("/classes/getUpcomingClassesCntByMonth").then(res => {
            setUpcomingClassesCnt(res.data.count);
            console.log(res.data)
        })
    }, [])

    useEffect(() => {
        let tmpDate = moment(date);
        const year = tmpDate.format("YYYY");
        const month = tmpDate.format("M");
        const day = tmpDate.format("D");

        httpClient.get(`/classes/getBookedClasses/${year}/${month}/${day}`).then(res => {
            setAgendaList(res.data);
        })
    }, [date])
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
                        {
                            agendaList.map((one, index) => {
                                let startDate = moment(one.startDate).format("LL");
                                return (
                                    <div key={`agenda-item_${index}`} className="agenda-item">
                                        <h3>{ startDate } - Class: { one.name }</h3>
                                    </div>      
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="status-list">
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
                        <h3>UPCOMING LESSIONS THIS MONTH</h3>
                    </div>
                    <div className="body">
                        <span>{ upcomingClassesCnt }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;