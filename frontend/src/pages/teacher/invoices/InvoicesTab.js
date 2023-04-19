import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import { Dropdown, DropdownButton } from "react-bootstrap";

import TableView from "../../../components/TableView";
import InvoiceForm from "./InvoiceForm";
import { getMyStudents } from "../../../store/slices/teacherSlice";
import { addNewError } from "../../../store/slices/errorSlice";
import { RootContext } from "../../../App";
import { deleteInvoiceAPI, downloadInvoiceAPI, getInvoiceListAPI, setInvoiceStatusAPI } from "../../../store/slices/invoiceSlice";
import TransactionDialog from "./TransactionDialog";
import EmailDialog from "./EmailDialog";

const InvoicesTab = props => {
    const rootContext = useContext(RootContext);
    const dispatch = useDispatch();
    const { invoiceList } = useSelector(state => state.invoice);

    const [mode, setMode] = useState("view");
    const [selected, setSelected] = useState([]);
    const [trDialogOpen, setTrDialogOpen] = useState(false);
    const [trSelected, setTrSelected] = useState({});
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
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
            label: "",
            name: "status"
        },
        {
            label: "Invoice #",
            name: "number"
        },
        {
            label: "Name",
            name: "studentName"
        },
        {
            label: "Contact",
            name: "email"
        },
        {
            label: "Invoice Date",
            name: "invoiceDate"
        },
        {
            label: "Time Period",
            name: "timePeriod"
        },
        {
            label: "Amount",
            name: "amount"
        }
    ]), []);

    useEffect(() => {
        dispatch(getInvoiceListAPI)
        dispatch(getMyStudents({ confirmed: 1 }));
    }, [])

    const getInvoiceById = invoiceId => {
        let invoice = invoiceList.find(one => one.id === invoiceId);

        return invoice;
    }

    const addTransactionEvent = (invoiceId, studentName) => {
        setTrSelected({ invoiceId, studentName });
        setTrDialogOpen(true);
    }

    const setInvoiceStatusEvent = (id, status) => {
        dispatch(setInvoiceStatusAPI({ id, status }));
    }

    const sendInvoiceMailEvent = invoice => {
        setTrSelected(invoice);
        setEmailDialogOpen(true);
    }

    const downloadInvoiceEvent = invoice => {
        dispatch(downloadInvoiceAPI(invoice));
    }

    const processInvoiceData = useCallback(() => {
        let result = [];
        invoiceList.forEach(one => {
            const optionMenu = (
                <DropdownButton
                    title=""
                    className="option-dropdown"
                    onClick={e => { e.stopPropagation() }}
                >
                    <Dropdown.Item href="#" onClick={() => addTransactionEvent(one.id, one.studentName)}>
                        <FontAwesomeIcon icon="fas fa-plus" color="green" />Add Transaction
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => sendInvoiceMailEvent(one)}><FontAwesomeIcon icon="fas fa-envelope" color="orange" />Email</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => downloadInvoiceEvent(one)}><FontAwesomeIcon icon="fas fa-download" />Download</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={() => setInvoiceStatusEvent(one.id, 1)}><FontAwesomeIcon icon="fas fa-money-bill" color="green" />Fully Paid</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => setInvoiceStatusEvent(one.id, 2)}><FontAwesomeIcon icon="fas fa-ban" color="red" />Void Invoice</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={() => setInvoiceStatusEvent(one.id, 0)}><FontAwesomeIcon icon="far fa-circle-xmark" color="red" />Not Paid</Dropdown.Item>
                </DropdownButton>
            );
            const statusIcon = (
                <>
                    { one.status === 1? <FontAwesomeIcon icon="fas fa-money-bill" color="green" />
                        : ( one.status === 2? <FontAwesomeIcon icon="fas fa-ban" color="red" />: "" ) }
                    { one.isEmailed === 1 && <FontAwesomeIcon icon="fas fa-envelope" color="orange" className="ms-1" /> }
                </>
            );
            result.push({
                ...one,
                options: optionMenu,
                status: statusIcon,
                invoiceDate: moment(one.invoiceDate).format("MM.DD.YYYY"),
                timePeriod: `${moment(one.invoiceFrom).format("MM.DD.YYYY")} - ${moment(one.invoiceTo).format("MM.DD.YYYY")}`,
            })
        });

        return result;
    }, [invoiceList]);

    const editInvoiceEvent = () => {
        if(!rootContext.context["invoice"] || (rootContext.context["invoice"] && !rootContext.context["invoice"].selected.length)) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "No Selected Rows!"
            }));
            return;
        }
        if(rootContext.context["invoice"].selected.length > 1) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "Select only one row to edit!"
            }));
            return;
        }
        setSelected(rootContext.context["invoice"].selected);
        setMode("edit");
    }
    const deleteInvoiceEvent = () => {
        let selected = rootContext.context["invoice"]?.selected ?? [];

        if(!selected.length) {
            dispatch(addNewError({
                status: false,
                title: "Warning",
                msg: "No Selected Rows!"
            }));
            return;
        }
        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure to delete?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        dispatch(deleteInvoiceAPI({ ids: selected }));
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

    return (
        <div>
            { mode === "view" && 
                <>
                    <div className="d-flex justify-content-end me-2 mb-2">
                        <button
                            className="btn-ctrl btn-ctrl-purple"
                            onClick={() => setMode("add")}
                        >
                            <FontAwesomeIcon icon="fas fa-plus" />New Invoice
                        </button>
                        <button
                            className="btn-ctrl btn-ctrl-purple mx-2"
                            onClick={() => editInvoiceEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-pen-to-square" />Edit
                        </button>
                        <button
                            className="btn-ctrl btn-ctrl-red"
                            onClick={() => deleteInvoiceEvent()}
                        >
                            <FontAwesomeIcon icon="fas fa-trash" />Delete
                        </button>
                    </div>
                    <TableView id="invoice" editable={true} columns={columns} rowData={processInvoiceData()} />
                    <TransactionDialog open={trDialogOpen} setOpen={setTrDialogOpen} mode="add" selected={trSelected} />
                    <EmailDialog open={emailDialogOpen} setOpen={setEmailDialogOpen} selected={trSelected} />
                </>
            }
            { mode === "add" &&
                <InvoiceForm mode={mode} setMode={setMode} />
            }
            { mode === "edit" && 
                <InvoiceForm mode={mode} setMode={setMode} selected={getInvoiceById(selected[0])} />
            }
        </div>
    )
}

export default InvoicesTab;