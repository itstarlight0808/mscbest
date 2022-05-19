import React, { useState, useEffect, Children } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { logout } from "../store/actions/userActions";

const Layout = (props) => {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }

    const logOut = () => {
        dispatch(logout());
    }
    return (
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={toggleMenu}>&#9776;</button>
                    <Link to="/">New Logo</Link>
                </div>
                <div className="header-links">
                    {userInfo ? (
                        <>
                            <Link to="/profile">{userInfo.name}</Link>
                            <a onClick={logOut}>Log Out</a>
                        </>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )}
                    {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <a href="#">Admin</a>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/orders">Orders</Link>
                                    <Link to="/products">Products</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={toggleMenu}>
                    x
                </button>
                <ul className="categories">
                    <li>
                        <Link to="/xxxx">xxxx</Link>
                    </li>

                    <li>
                        <Link to="/yyyyyy">xxxxx</Link>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    {props.children}
                </div>
            </main>
            <footer className="footer">All right reserved.</footer>
        </div>
    );
}

export default Layout;