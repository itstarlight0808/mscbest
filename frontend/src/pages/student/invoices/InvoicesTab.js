import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Dropdown, DropdownButton } from "react-bootstrap";

import TableView from "../../../components/TableView";
import { downloadInvoiceAPI, getInvoiceListAPI } from "../../../store/slices/invoiceSlice";

const InvoicesTab = props => {
    const dispatch = useDispatch();
    const { invoiceList } = useSelector(state => state.invoice);

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
    }, []);

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
                    <Dropdown.Item href="#" onClick={() => downloadInvoiceEvent(one)}><FontAwesomeIcon icon="fas fa-download" />Download</Dropdown.Item>
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

    return (
        <div>
            <TableView id="invoice" columns={columns} rowData={processInvoiceData()} />
        </div>
    )
}

export default InvoicesTab;