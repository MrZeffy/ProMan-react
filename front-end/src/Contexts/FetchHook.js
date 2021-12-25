import { useContext, createContext } from "react";

import React from 'react'

const FetchFunctionContext  = createContext();

export const useFetchFunctionContext = () => {
    return useContext(FetchFunctionContext);
}

export const FetchHookProvider = ({children}) => {
    const fetchData = (url, method, body) =>{
        return fetch(`http://localhost${url}`, {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'Application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((data) => data.json());
    }
    return (
        <FetchFunctionContext.Provider value={fetchData}>
            {children}
        </FetchFunctionContext.Provider>
    )
}


