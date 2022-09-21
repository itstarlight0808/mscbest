import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { withStyles, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Menu, MenuItem } from "@material-ui/core";

import { isSameByYearMonthDay, classType  } from "../../../utils/common";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: "8px 0"
    },
    // body: {
    //     fontSize: 14,
    //     padding: "12px 0",
    // },
}))(TableCell);

const useStyles = makeStyles(theme => ({
    menuListItem: {
        fontSize: 14
    }
}))

const MonthlyView = props => {
    const classes = useStyles();

    const { classList } = useSelector(state => state.classes);

    const weekdayshort = moment.weekdaysShort();
    const selectedDate = moment(props.selectedDate);
    const firstDayOfMonth = moment(selectedDate).startOf("month");
    const [dayMenu, setDayMenu] = useState(null);

    const days = [];
    const getTodoList = date => {
        const todoList = [];
        classList.forEach(oneClass => {
            oneClass.schedule.forEach(oneSchedule => {
                let startDate = moment(oneSchedule.startDate);
                if(isSameByYearMonthDay(date, startDate)) {
                    if( todoList.length === 0 || (todoList.length > 0 && todoList[todoList.length-1].id !== oneClass.id) )
                        todoList.push({...oneClass, schedule: [oneSchedule]});
                    else
                        todoList[todoList.length-1].schedule.push(oneSchedule);
                }
            })
        })

        return todoList;
    }
    for(let i=0; i<firstDayOfMonth.day() + firstDayOfMonth.daysInMonth(); i++) {
        if(i%7 === 0)
            days.push([]);
        let date = moment(firstDayOfMonth).add(i - firstDayOfMonth.day(), "days");
        let todoList = i < firstDayOfMonth.day()? []: getTodoList(date);
        days[days.length-1].push({ date , todoList });
    }
    const cellClickEvent = (e, date) => {
        if(date.isBefore(firstDayOfMonth))
            return;
        props.setSelectedDate(date);
        setDayMenu({ anchorEl: e.currentTarget, date });
    }

    const tableBody = days.map((oneWeek, index) => (
        <TableRow key={`row_${index}`}>
            {
                oneWeek.map((one, index) => {
                    let className = selectedDate.isSame(one.date, "days")? "selected": "";
                    className += isSameByYearMonthDay(moment(), one.date)? " today": "";
                    let todoList = one.todoList.slice(0, Math.min(one.todoList.length, 2));

                    return (
                        <StyledTableCell align="center" key={`cell_${index}`}>
                            { one.date.isSameOrAfter(firstDayOfMonth) &&
                                <>
                                    <div className={ "day " + className} onClick={(e) => cellClickEvent(e, one.date)}>
                                        { one.date.date() }
                                    </div>
                                    <Menu
                                        anchorEl={dayMenu?.anchorEl}
                                        open={ one.date.isSame(dayMenu?.date) }
                                        onClose={() => setDayMenu(null)}
                                    >
                                        <MenuItem className={classes.menuListItem} onClick={() => props.setCalendarView("day")}>Switch to DayView</MenuItem>
                                    </Menu>
                                    <div className="class-list">
                                        {
                                            todoList.map((one, index) => (
                                                <div
                                                    key={`class_item_${index}`}
                                                    className="class-item"
                                                    style={{ background: classType[one.type].color }}
                                                >
                                                    <span>{ one.name }</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            }
                        </StyledTableCell>
                    )
                })
            }
        </TableRow>
    ))
    return (
        <div className="c-monthly-view">
            <TableContainer component={Paper}>
                <Table aria-label="weekly view" className="calendar-table">
                    <TableHead>
                        <TableRow>
                            {
                                weekdayshort.map((one, index) => ( <StyledTableCell align="center" key={`cell_${index}`}>{ one }</StyledTableCell> ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableBody
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MonthlyView;