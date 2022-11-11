import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Sidebar, { studentMenuList, teacherMenuList } from "./Sidebar";
import NotFound from "../../NotFound";
import Resources from "../teacher/resources/index";
import TeacherHome from "../teacher/home/index";
import StudentHome from "../student/home/index";
import MyStudents from "../teacher/mystudents/index";
import MyClasses from "../teacher/myclasses/index";
import MyCalendar from "../teacher/mycalendar/index";
import StudentProfile from "../student/profile/index";
import TeacherProfile from "../teacher/profile/index";
import TeacherSetting from "../teacher/setting/index";
import ContactInfo from "../student/contactinfo/ContactInfo";

const Dashboard = props => {
    let baseUrl = props.match.url;
    let curUrl = props.location.pathname;

    let { userInfo } = useSelector(state => state.user);
    
    const getBreadCrumb = () => {
        let breadCrumb;
        if(userInfo.accountType === 0)
            breadCrumb = studentMenuList.find(one => one.url === curUrl);
        else if(userInfo.accountType === 1)
            breadCrumb = teacherMenuList.find(one => one.url === curUrl);
        // else
        //     return teacherMenuList.find(one => one.url === curUrl);
        if(breadCrumb)
            return breadCrumb;
        const extra = [
            { icon: <FontAwesomeIcon icon="fas fa-gear" className="me-2" />, url: "/dashboard/setting", name: "Studio Setting" },
            { icon: <FontAwesomeIcon icon="fas fa-gear" className="me-2" />, url: "/dashboard/preference", name: "My Preference" },
            { icon: <FontAwesomeIcon icon="fas fa-gear" className="me-2" />, url: "/dashboard/profile", name: "My Profile" }
        ];

        return extra.find(one => one.url === curUrl);
    }
    let breadcrumb = getBreadCrumb();

    const [open, setOpen] = useState(true);

    return (
        <div className="dashboard-container h-100">
            <Sidebar open={open} />
            <FontAwesomeIcon icon="fas fa-bars" className="toggle-sidebar" onClick={() => setOpen(!open)} />
            <div className="flex-fill mx-1">
                <div className="custom-breadcrumb">
                  {breadcrumb?.icon} {breadcrumb?.name}  
                </div>
                { userInfo.accountType === 0 &&
                    <Switch>
                        <Route path={`${baseUrl}/calendar`} component={MyCalendar} />
                        <Route path={`${baseUrl}/profile`} component={StudentProfile} />
                        <Route path={`${baseUrl}/contactinfo`} component={ContactInfo} />
                        <Route path={`${baseUrl}`} component={StudentHome} exact={true} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                }
                { userInfo.accountType === 1 &&
                    <Switch>
                        <Route path={`${baseUrl}/students`} component={MyStudents} />
                        <Route path={`${baseUrl}/classes`} component={MyClasses} />
                        <Route path={`${baseUrl}/calendar`} component={MyCalendar} />
                        <Route path={`${baseUrl}/resources`} component={Resources} />
                        <Route path={`${baseUrl}/preference`} component={TeacherProfile} />
                        <Route path={`${baseUrl}/setting`} component={TeacherSetting} />
                        <Route path={`${baseUrl}`} component={TeacherHome} exact={true} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                }
            </div>
        </div>
    );
}

export default Dashboard;