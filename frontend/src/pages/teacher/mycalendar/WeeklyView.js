import React, { useState } from "react";
import moment from "moment";
import { withStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import DailyView from "./DailyView";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        padding: 2,
        minWidth: 290
    },
}))(TableCell);

const WeeklyView = props => {
    const tableWidth = screen.width - 230;
    const weekdayshort = moment.weekdaysShort();
    const selectedDate = moment(props.selectedDate);
    const weekdays = new Array(7).fill(0).map((one, index) => {
        let date = moment( selectedDate.add( index - selectedDate.day(), "days" ) );
        return date;
    });
    return (
        <div className="c-weekly-view" style={{ width: tableWidth }}>
            <TableContainer component={Paper}>
                <Table aria-label="weekly view">
                    <TableHead>
                        <TableRow>
                            {
                                weekdayshort.map((one, index) => {
                                    let date = selectedDate.add( index - selectedDate.day(), "days" );

                                    return (
                                        <StyledTableCell key={`cell_${index}`}>{ date.date()+ "th - " + one }</StyledTableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {
                                weekdays.map((date, index) => {
                                    return (
                                        <StyledTableCell key={`cell_${index}`}>
                                            <DailyView selectedDate={date} />
                                        </StyledTableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default WeeklyView;