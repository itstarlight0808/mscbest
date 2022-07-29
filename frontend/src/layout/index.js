import React, { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    
    return (
        <div className="grid-container">
            <Header />        
            <main className="main">
                <div className="content h-100">
                    {props.children}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;