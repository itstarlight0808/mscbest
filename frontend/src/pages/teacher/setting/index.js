import React, { useState } from "react";
import TabPanel from "../../../components/TabPanel";
import { AppBar, Tab, Tabs } from "@material-ui/core";

import DefaultSetting from "./Default";
import Membership from "./Membership";
import InvoiceSetting from "./InvoiceSetting";
import TeacherBio from "./TeacherBio";
import PolicySetting from "./PolicySetting";

const Setting = props => {
    const [selTab, setSelTab] = useState(0);

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={selTab}
                    onChange={(event, newVal) => setSelTab(newVal)}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Options" />
                    <Tab label="Membership" />
                    <Tab label="Invoices" />
                    <Tab label="Teacher Page" />
                    <Tab label="Policies" />
                    <Tab label="Emails" />
                    <Tab label="Tax Sales" />
                    <Tab label="Online Payments" />
                </Tabs>
            </AppBar>
            <TabPanel value={selTab} index={0}>
                <DefaultSetting />
            </TabPanel>
            <TabPanel value={selTab} index={1}>
                <Membership />
            </TabPanel>
            <TabPanel value={selTab} index={2}>
                <InvoiceSetting />
            </TabPanel>
            <TabPanel value={selTab} index={3}>
                <TeacherBio />
            </TabPanel>
            <TabPanel value={selTab} index={4}>
                <PolicySetting />
            </TabPanel>
            <TabPanel value={selTab} index={5}>
                Item6
            </TabPanel>
            <TabPanel value={selTab} index={6}>
                Item7
            </TabPanel>
            <TabPanel value={selTab} index={7}>
                Item8
            </TabPanel>
        </div>
    )
}

export default Setting;