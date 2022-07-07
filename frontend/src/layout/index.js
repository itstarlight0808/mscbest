import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@material-ui/core";

import { logout } from "../store/actions/userActions";

import LogoImage from "../assets/images/logo.svg";


const Layout = (props) => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const logOut = () => {
        dispatch(logout());
    }
    return (
        <div className="grid-container">
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
                                <li className="nav-item">
                                    <Link to="/get-started" className="nav-link get-started">Sign Up</Link>
                                </li>
                                {userInfo ? (
                                    <>
                                        <li className="nav-item"><Link to="/profile" className="nav-link">{userInfo.name}</Link></li>
                                        <li className="nav-item"><Link onClick={logOut} className="nav-link">Log Out</Link></li>
                                    </>
                                ) : (
                                    <li className="nav-item"><Link to="/signin" className="nav-link">Log In</Link></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="main">
                <div className="content">
                    {props.children}
                </div>
            </main>
            <footer className="footer">
                <div className="logo-container">
                    <img src={LogoImage} alt="Logo Image"/>
                    <div className="subscribe-container">
                        <h4 className="text">
                            Subscribe to our newsletter and be the first to know about our updates
                        </h4>
                        <div className="subscribe-form">
                            <input placeholder="Email Address" />
                            <button className="btn btn-subscribe">Subscribe</button>
                        </div>
                    </div>
                </div>
                <div className="footer-menu">
                    <ul>
                        <li className="menu-item">
                            <Link to="/" className="menu-link">HOME</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/" className="menu-link">COMPANY</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/" className="menu-link">BLOG</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/contact" className="menu-link">CONTACT US</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/" className="menu-link">SITEMAP</Link>
                        </li>
                    </ul>
                    <div className="social-links">
                        <i className="fa fa-facebook"></i>
                        <i className="fa fa-twitter"></i>
                        <i className="fa fa-linkedin"></i>
                        <i className="fa fa-instagram"></i>
                    </div>
                </div>
                <div className="copyright-container">
                    <h4>
                        © 2022 MusicalBEST. All right reserved
                    </h4>
                    <div className="privacy-container">
                        <Link to="/ppolicy" className="menu-link">Privacy Policy</Link>
                        <Link to="/cpolicy" className="menu-link">Cookie Policy</Link>
                        <Link to="/terms" className="menu-link">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;