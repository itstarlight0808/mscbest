import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import { Dropdown, DropdownButton } from "react-bootstrap";

import TableView from "../../../components/TableView";
import { addNewError } from "../../../store/slices/errorSlice";
import { RootContext } from "../../../App";
import { getTransactionListAPI, deleteTransactionAPI } from "../../../store/slices/transactionSlice";
import { transactionType } from "../../../utils/common";
import TransactionDialog from "./TransactionDialog";
import RefundIcon from "../../../assets/images/icons/refund.svg";

const TransactionTab = props => {
    const rootContext = useContext(RootContext);
    const dispatch = useDispatch();
    const { transactionList } = useSelector(state => state.transaction);

    const [mode, setMode] = useState("view");
    const [selected, setSelected] = useState([]);
    const [trDialogOpen, setTrDialogOpen] = useState(false);
    const columns = useMemo(() => ([
        {
            label: "id",
            name: "id",
            hidden: true
        },
        {
            label: "",
            name: "options"
        },
        {
            label: "Date",
            name: "date"
        },
        {
            label: "Name",
            name: "studentName"
        },
        {
            label: "Type",
            name: "type"
        },
        {
            label: "Description",
            name: "description"
        },
        {
            label: "Amount",
            name: "amount"
        },
    ]), []);

    useEffect(() => {
        dispatch(getTransactionListAPI);
    }, [])

    const editTransactionEvent = params => {
        setSelected(params);
        setTrDialogOpen(true);
    }
    const deleteTransactionEvent = id => {
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to delete?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        dispatch(deleteTransactionAPI( [id] ));
                    }
                },
                {
                    label: "No",
                    onClick: () => {
                        console.log("delete confirm was cancelled..")
                    }
                }
            ]
        })
    }

    const processTransactionData = useCallback(() => {
        let result = [];
        transactionList.forEach(one => {
            const optionMenu = (
                <DropdownButton
                    title=""
                    className="option-dropdown"
                    onClick={e => { e.stopPropagation() }}
                >
                    <Dropdown.Item href="#" onClick={() => editTransactionEvent(one)}>
                        <FontAwesomeIcon icon="fas fa-edit" color="green" />Edit
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => deleteTransactionEvent(one.id)}>
                        <FontAwesomeIcon icon="fas fa-trash" color="red" />Delete
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#"><FontAwesomeIcon icon="fas fa-download" />Download</Dropdown.Item>
                </DropdownButton>
            );
            result.push({
                ...one,
                options: optionMenu,
                date: moment(one.date).format("MM.DD.YYYY"),
                type: transactionType[one.type]
            })
        });

        return result;
    }, [transactionList]);

    return (
        <div>
            { mode === "view" && 
                <>
                    <div className="d-flex me-2 mb-2">
                        <DropdownButton
                            title="Type"
                            onClick={e => { e.stopPropagation() }}
                        >
                            <Dropdown.Item href="#"><FontAwesomeIcon icon="fas fa-money-bill" color="green" />Payment</Dropdown.Item>
                            <Dropdown.Item href="#"><img src={RefundIcon} width="18px" height="18px" alt="refund icon" />Refund</Dropdown.Item>
                            <Dropdown.Item href="#"><FontAwesomeIcon icon="fas fa-bolt" color="orange" className="me-2" />Charge</Dropdown.Item>
                            <Dropdown.Item href="#"><FontAwesomeIcon icon="fas fa-tags" color="red" />Discount</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <TableView id="transaction" columns={columns} rowData={processTransactionData()} />
                </>
            }
            { trDialogOpen && <TransactionDialog open={trDialogOpen} setOpen={setTrDialogOpen} mode="edit" selected={selected} /> }
        </div>
    )
}

export default TransactionTab;