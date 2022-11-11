import React, { useState } from "react";
import TabPanel from "../../../components/TabPanel";
import { AppBar, Tab, Tabs } from "@material-ui/core";

import DefaultSetting from "./default";

const Setting = props => {
    const [selTab, setSelTab] = useState(0);

    return (
        <>
            <AppBar position="static" color="default">
                <Tabs
                    value={selTab}
                    onChange={(event, newVal) => setSelTab(newVal)}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Options" />
                    {/* <Tab label="Membership" /> */}
                </Tabs>
            </AppBar>
            <TabPanel value={selTab} index={0}>
                <DefaultSetting />
            </TabPanel>
            <TabPanel value={selTab} index={1}>
                Item2
            </TabPanel>
        </>
    )
}

export default Setting;