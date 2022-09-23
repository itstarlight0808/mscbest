import React, { useState, useEffect, useContext } from "react"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell,
     Paper, Button, ButtonGroup, makeStyles, withStyles, TableSortLabel, Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootContext } from "../App";

const StyledTableCell = withStyles(theme => ({
   head: {
        backgroundColor: "#6385ff",
        color: "#fff",
        padding: "8px 16px"
    }
}))(TableCell)
const useStyles = makeStyles((theme) => ({
    tableContainer: {
        height: "600px"
    },
    tableRowRoot: {
        "&$tableRowSelected, &$tableRowSelected:hover": {
            backgroundColor: "#ccd4ff"
        }
    },
    tableRowSelected: {
        backgroundColor: "#ccd4ff"
    },
    tableCheckBox: {
        "& .MuiIconButton-label": {
            background: "#fff"
        }
    }
}));

const TableView = props => {
    const classes = useStyles();
    const rootContext = useContext(RootContext);

    const totalRecords = props.rowData? props.rowData.length: 0;
    
    const [rowData, setRowData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const totalPage = Math.ceil(totalRecords / pageLimit);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(props.orderBy ?? "id");

    const comparator = (a, b) => {
        if(a[orderBy] > b[orderBy])
            return 1;
        if(a[orderBy] < b[orderBy])
            return -1;
        return 0;
    }
    useEffect(() => {
        let tmpList = props.rowData ?? [];
        tmpList = tmpList.map((one, index) => [one, index]);
        tmpList.sort((a, b) => {
            let result = order === "asc"? comparator(a[0], b[0]): -comparator(a[0], b[0]);

            if(result !== 0)
                return result;
            return a[1] - b[1];
        });
        tmpList = tmpList.map(one => one[0]);
        setRowData(tmpList);
    }, [props.rowData, order, orderBy])
    
    const getRowDataByPage = () => {
        let start = (page - 1) * pageLimit;
        let end = Math.min(page * pageLimit, totalRecords);

        return rowData.slice(start, end);
    }
    useEffect(() => {
        setPage(Math.min(1, totalPage));
    }, [props.rowData])

    const makeSortRequest = (cellName) => {
        const isAsc = order === "asc" && orderBy === cellName;
        setOrderBy(cellName);
        setOrder(isAsc? "desc": "asc");
    }

    const selRowEvent = (id) => {
        if(!props.editable)
            return;

        let selected = rootContext.context[props.id]?.selected ?? [];
        let selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if(selectedIndex === -1)
            newSelected = [...selected, id];
        else {
            selected.splice(selectedIndex, 1);
            newSelected = [...selected];
        }

        rootContext.setContext({
            [props.id]: {
                selected: newSelected
            }
        })
    }
    const selectAllClickEvent = e => {
        let newSelecteds = [];
        if (e.target.checked) {
            newSelecteds = rowData.map(one => one.id);
        }
        rootContext.setContext({
            [props.id]: {
                selected: newSelecteds
            }
        })
    }
    return (
        <div>
            <TableContainer component={Paper} classes={{ root: classes.tableContainer }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            { props.editable &&
                                <StyledTableCell>
                                    <Checkbox
                                        classes={{ root: classes.tableCheckBox }}
                                        color="primary"
                                        checked={rootContext.context[props.id]?.selected.length === rowData.length}
                                        onClick={e => selectAllClickEvent(e)}
                                    />
                                </StyledTableCell>
                            }
                            { props.columns &&
                                props.columns.map((column, index) => {
                                    if(column.hidden && column.hidden === true)
                                        return;
                                    return (
                                        <StyledTableCell key={`headerCell_${index}`} sortDirection={orderBy === column.name? order: false}>
                                            <TableSortLabel
                                                active={orderBy === column.name}
                                                direction={orderBy === column.name? order: "asc"}
                                                onClick={() => makeSortRequest(column.name)}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        </StyledTableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { getRowDataByPage().map( (row, index) => {
                            let isItemSelected = props.id && rootContext.context[props.id]? rootContext.context[props.id].selected.indexOf(row.id): -1;

                            return (
                                <TableRow
                                    key={`row_${index}`}
                                    sx={{ '&:last-child td, &:last-child th': {border: 0} }}
                                    hover
                                    onClick={() => selRowEvent(row.id)}
                                    role="checkbox"
                                    selected={isItemSelected !== -1}
                                    classes={{ 
                                        root: classes.tableRowRoot,
                                        selected: classes.tableRowSelected
                                     }}
                                >
                                    { props.editable &&
                                        <TableCell>
                                            <Checkbox
                                                checked={isItemSelected !== -1}
                                                inputProps={{ 'aria-labelledby': `table-checkbox-${index}` }}
                                                color="primary"
                                            />
                                        </TableCell>
                                    }
                                    {
                                        props.columns.map((column, cellIndex) => {
                                            if(column.hidden && column.hidden === true)
                                                return;
                                            return (
                                                <TableCell style={column.width? {minWidth: column.width}: {}} key={`cell_${cellIndex}`}>
                                                    <>
                                                        {row[column.name]}
                                                    </>
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            );
                          })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="pagination">
                <span>Showing {(page-1)*pageLimit+1} - {Math.min(page*pageLimit, totalRecords)} of {totalRecords} items</span>
                <ButtonGroup className="btn-group">
                    {
                        Array(totalPage).fill(0).map( (val, index) => (
                            <Button 
                                key={`btn_${index}`}
                                variant="contained"
                                color={ page === (index + 1)? "primary": "" }
                                onClick={() => (setPage(index+1))}
                            >
                                {index+1}
                            </Button>
                        ))
                    }
                </ButtonGroup>
            </div>
        </div>
    );
}

export default TableView;