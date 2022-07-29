import React, { useState } from "react";
import { Link } from "react-router-dom";

import LogoImage from "../assets/images/logo.svg";

const Footer = props => {
    return (
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
    );
}

export default Footer;