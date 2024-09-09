import React from 'react';
import logo from "../../assets/error.svg"

function Notfound(props) {
    return (
        <div className="flex flex-col items-center justify-center  ">
            <h1>error</h1>
            <img src={logo} />
        </div>
    );
}

export default Notfound;