import React, {useContext} from 'react';
import {CounterContext} from "../counterCountext/counterContext.jsx";

function Brand(props) {
    let {count , setCount} = useContext(CounterContext);
    return (
        <div>
            <h1>count : {count} </h1>
            <button onClick={()=> setCount(count+1)}> increse</button>
        </div>
    );
}

export default Brand;