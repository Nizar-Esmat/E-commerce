import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

function Layout(props) {
    return (
        <div>
            <Navbar></Navbar>


            <div className="container" >
                <Outlet></Outlet>
            </div>

        </div>
    );
}

export default Layout;