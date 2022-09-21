import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { List, ListItem, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";

import { userLogOut } from "../../store/slices/userSlice";
import { CONFIG } from "../../config/index"

import resourcesImage from "../../assets/images/dashboard/resources.svg";
import invoicesImage from "../../assets/images/dashboard/students_invoices.svg";
import expensesImage from "../../assets/images/dashboard/expenses.svg";
import reportsImage from "../../assets/images/dashboard/reports.svg";
import contactInfoImage from "../../assets/images/dashboard/contact_info.svg";

export const teacherMenuList = [
    { icon: <FontAwesomeIcon icon="fas fa-house" className="me-2" />, url: "/dashboard", name: "Home" },
    { icon: <FontAwesomeIcon icon="fas fa-user-group" className="me-2" />, url: "/dashboard/students", name: "Students" },
    { icon: <FontAwesomeIcon icon="fas fa-book-open-reader" className="me-2" />, url: "/dashboard/classes", name: "My Classes" },
    { icon: <FontAwesomeIcon icon="fas fa-calendar-days" className="me-2" />, url: "/dashboard/calendar", name: "Calendar" },
    { icon: <img className="me-2" src={resourcesImage} alt="menu icon" />, url: "/dashboard/resources", name: "Online Resources" },
    { icon: <img className="me-2" src={invoicesImage} alt="menu icon" />, url: "/dashboard/invoices", name: "Students & Invoices" },
    { icon: <img className="me-2" src={expensesImage} alt="menu icon" />, url: "/dashboard/expenses", name: "Expenses" },
    { icon: <img className="me-2" src={reportsImage} alt="menu icon" />, url: "/dashboard/reports", name: "Reports" },
    { icon: <FontAwesomeIcon icon="fas fa-bell" className="me-2" />, url: "/dashboard/notifications", name: "Notifications" },
];
export const studentMenuList = [
    { icon: <FontAwesomeIcon icon="fas fa-house" className="me-2" />, url: "/dashboard", name: "Home" },
    { icon: <FontAwesomeIcon icon="fas fa-calendar-days" className="me-2" />, url: "/dashboard/calendar", name: "Calendar" },
    { icon: <img className="me-2" src={contactInfoImage} alt="menu icon" />, url: "/dashboard/contactInfo", name: "Contact Info" },
    { icon: <img className="me-2" src={invoicesImage} alt="menu icon" />, url: "/dashboard/invoices", name: "Account & Invoices" },
    { icon: <img className="me-2" src={resourcesImage} alt="menu icon" />, url: "/dashboard/resources", name: "Online Resources" },
    { icon: <FontAwesomeIcon icon="fas fa-paper-plane" className="me-2" />, url: "/dashboard/message/history", name: "Message History" },
    { icon: <FontAwesomeIcon icon="far fa-pen-to-square" className="me-2" />, url: "/dashboard/attendancenotes", name: "Attendance & Notes" },
];

const Sidebar = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    const logOut = () => {
        dispatch(userLogOut());
        history.push("/");
    }
    return (
        <div className={`sidebar ${props.open? "open": ""}`}>
            <div className="avatar-container">
                { userInfo.avatar ? <Avatar alt="avatar" src={`${CONFIG.serverPath}/uploads/avatars/teacher.png`} />
                    : <FontAwesomeIcon icon="fas fa-user-tie" />
                }
                <div>
                    <h2>Holly Hylton</h2>
                    <h3>{ userInfo.accountType === 0? "Student": (userInfo.accountType === 1? "Teacher": "School") }</h3>
                </div>
            </div>
            { userInfo.accountType === 0 && 
                <List>
                    {
                        studentMenuList.map((one, index) => (
                            <ListItem className={`menu-item ${history.location.pathname === one.url? "active": ""}`} key={`list-item-${index}`} button>
                                {one.icon}
                                <Link to={one.url}>{one.name}</Link>
                            </ListItem>
                        ))
                    }
                </List>
            }
            { userInfo.accountType === 1 && 
                <List>
                    {
                        teacherMenuList.map((one, index) => (
                            <ListItem className={`menu-item ${history.location.pathname === one.url? "active": ""}`} key={`list-item-${index}`} button>
                                {one.icon}
                                <Link to={one.url}>{one.name}</Link>
                            </ListItem>
                        ))
                    }
                </List>
            }
            <hr className="divider" />
            <Accordion className="menu-accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <FontAwesomeIcon icon="fas fa-sliders" className="me-2" />
                        Settings
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListItem className={`menu-item ${history.location.pathname === "/dashboard/settings"? "active": ""}`} button>
                            <Link to="/dashboard/settings">Studio Settings</Link>
                        </ListItem>
                        <ListItem className={`menu-item ${history.location.pathname === "/dashboard/preferences"? "active": ""}`} button>
                            <Link to="/dashboard/preferences">My Preferences</Link>
                        </ListItem>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <ListItem className="menu-item mb-3 p-0 pe-2 text-center" button>
                <a onClick={logOut}>
                    <FontAwesomeIcon icon="fas fa-right-from-bracket" className="me-2" />
                    Sign Out
                </a>
            </ListItem>
        </div>
    );
}

export default Sidebar;