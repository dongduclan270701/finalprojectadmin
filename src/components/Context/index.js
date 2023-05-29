import { useState, useEffect, createContext } from 'react'
import {  } from 'Apis'
const StateContext = createContext()
const TOKEN_SECRET_ADMIN = "Admin_Secret_JWT"
function StateProvider({ children }) {
    const [arrayOrder, setArrayOrder] = useState([])
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('auth-token-user'))) {
            // const verified = jwt.verify(JSON.parse(localStorage.getItem('auth-token-user')), TOKEN_SECRET_ADMIN)
        }
    }, [])
    const value = {
        arrayOrder
    }
    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    )
}
export { StateContext, StateProvider }