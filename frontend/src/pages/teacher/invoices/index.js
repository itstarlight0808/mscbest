import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "../../../components/TabPanel";

import InvoicesTab from "./InvoicesTab";
import TransactionTab from "./TransactionTab";

const Invoices = props => {
    const [selTab, setSelTab] = useState(0);

    return (
        <div className="p-invoices-container">
            <AppBar position="static" color="default">
                <Tabs
                    value={selTab}
                    onChange={(event, newVal) => setSelTab(newVal)}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable auto tabs"
                >
                    <Tab label="Invoices" />
                    <Tab label="Transactions" />
                </Tabs>
            </AppBar>
            <TabPanel value={selTab} index={0}>
                <InvoicesTab />
            </TabPanel>
            <TabPanel value={selTab} index={1}>
                <TransactionTab />
            </TabPanel>
        </div>
    );
}

export default Invoices;