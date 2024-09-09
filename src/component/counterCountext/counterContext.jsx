

import { createContext, useState } from 'react';

export const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
        <CounterContext.Provider value={{ count, setCount }}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContextProvider;
