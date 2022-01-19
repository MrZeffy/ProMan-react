import { useContext, createContext } from "react";

import React from 'react'

const FetchFunctionContext  = createContext();

export const useFetchFunctionContext = () => {
    return useContext(FetchFunctionContext);
}

export const FetchHookProvider = ({children}) => {
    const fetchData = (url, method, body) =>{
        let fetchOptions = {
            method: method || 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'Application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            credentials: 'include',            
        }

        if(body){            
            fetchOptions.body = JSON.stringify(body);
        }
        return fetch(`http://localhost${url}`, fetchOptions).then((data) => data.json());
    }
    return (
        <FetchFunctionContext.Provider value={fetchData}>
            {children}
        </FetchFunctionContext.Provider>
    )
}


