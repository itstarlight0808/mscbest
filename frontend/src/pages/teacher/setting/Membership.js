import React, { useMemo, useState } from "react";

import TableView from "../../../components/TableView";

const Membership = props => {
    const columns = useMemo(() => ([
        {
            label: "id",
            name: "id",
            hidden: true
        },
        {
            label: "",
            name: "download",
        },
        {
            label: "Date",
            name: "date",
        },
        {
            label: "Transaction ID",
            name: "transactionId",
        },
        {
            label: "Payment Type",
            name: "paymentType",
        },
        {
            label: "Payment ID",
            name: "paymentId",
        },
        {
            label: "Description",
            name: "description",
        },
        {
            label: "Tax",
            name: "tax",
        },
        {
            label: "Amount",
            name: "amount",
        },
        {
            label: "",
            name: "delBtn",
        }
    ]));
    const [membershipList, setMembershipList] = useState([]);
    return (
        <div className="p-membership">
            <div className="status-container">
                <div>
                    <label>Status: </label><span>You are currently subscribed to a 1 member plan using Paypal</span>
                </div>
                <button className="btn-ctrl btn-ctrl-red ms-auto">Unsubscribe</button>
            </div>
            <h3 className="mt-3 mb-3">Billing History</h3>
            <TableView columns={columns} rowData={membershipList} />
        </div>
    )
}

export default Membership;