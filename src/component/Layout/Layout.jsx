import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer.jsx";

function Layout(props) {
    return (
        <div>
            <Navbar></Navbar>


            <div className="container" >
                <Outlet></Outlet>
            </div>

            <Footer></Footer>

        </div>
    );
}

export default Layout;