import React from 'react';

function Loading(props) {
    return (
        <div
            className="absolute top-0 bottom-0 left-0 right-0 bg-green-600 bg-opacity-5 flex justify-center items-center ">
            <span className="loader"></span>

        </div>
    );
}

export default Loading;