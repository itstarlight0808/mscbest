import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@material-ui/core";

import LogoImage from "../assets/images/logo.svg";

const Header = props => {
    const { userInfo } = useSelector((state) => state.user);
    const { systemNotificationList, personalNotificationList } = useSelector(state => state.notification);

    const unreadNotificationCnt = useMemo(() => {
        const unreadSysNotification = systemNotificationList.filter(one => one.isRead === 0);
        const unreadPerNotification = personalNotificationList.filter(one => one.isRead === 0);

        return unreadSysNotification.length + unreadPerNotification.length;
    }, [ systemNotificationList, personalNotificationList ])

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light w-100">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={LogoImage} alt="Logo Image"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="aboutusDropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ABOUT US
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="aboutusDropdownMenu">
                                    <li><Link to="/about" className="dropdown-item">About Us</Link></li>
                                    <li><a href="/about?#news" className="dropdown-item">News</a></li>
                                    <li><a href="/about?#teachers" className="dropdown-item">For Teachers</a></li>
                                    <li><a href="/about?#students" className="dropdown-item">For Students</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link to="/class" className="nav-link">CLASSES</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/teacher" className="nav-link">TEACHERS</Link>
                            </li>
                            
                            {userInfo ? (
                                <>
                                    <li className="nav-item logged-in-group">
                                        <div className="d-flex">
                                            {/* <Link to="/notifications" className="nav-link"> */}
                                            <Link to="/hide-kkk" className="nav-link">
                                                <Badge badgeContent={unreadNotificationCnt} color="secondary" overlap="rectangular"><FontAwesomeIcon icon="fas fa-bell" /></Badge>
                                            </Link>
                                            <Link to="/messages" className="mx-3 nav-link">
                                                <Badge badgeContent={0} overlap="rectangular"><FontAwesomeIcon icon="far fa-envelope" /></Badge>
                                            </Link>
                                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link get-started">Sign Up</Link>
                                    </li>
                                    <li className="nav-item"><Link to="/signin" className="nav-link">Log In</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;