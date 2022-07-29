import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Sidebar, { studentMenuList, teacherMenuList } from "./Sidebar";
import Resources from "./Resources";
import Home from "./Home";

const Dashboard = props => {
    let baseUrl = props.match.url;
    let curUrl = props.location.pathname;

    let { userInfo } = useSelector(state => state.user);
    
    const getBreadCrumb = () => {
        if(userInfo.accountType === 0)
            return studentMenuList.find(one => one.url === curUrl);
        else if(userInfo.accountType === 1)
            return teacherMenuList.find(one => one.url === curUrl);
        // else
        //     return teacherMenuList.find(one => one.url === curUrl);
        return {};
    }
    let breadcrumb = getBreadCrumb();

    const [open, setOpen] = useState(true);

    return (
        <div className="dashboard-container h-100">
            <Sidebar open={open} />
            <FontAwesomeIcon icon="fas fa-bars" className="toggle-sidebar" onClick={() => setOpen(!open)} />
            <div className="flex-fill mx-1">
                <div className="custom-breadcrumb">
                  {breadcrumb.icon} {breadcrumb.name}  
                </div>
                <Switch>
                    <Route path={`${baseUrl}/resources`} component={Resources} />
                    <Route path={`${baseUrl}`} component={Home} exact={true} />
                </Switch>
            </div>
        </div>
    );
}

export default Dashboard;