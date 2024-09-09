import React, {useEffect} from 'react';
import {jwtDecode} from "jwt-decode";

// Create the context
export const AuthContext = React.createContext(null);

// Create the provider component
function AuthContextProvider({ children }) {
    const [isLogged, setIsLogged] = React.useState(null);
    //handle refresh

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            setIsLogged(jwtDecode( localStorage.getItem('token')));
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
