import { useState, createContext } from 'react'
const StateContext = createContext()
function StateProvider({ children }) {
    const [authentication, setAuthentication] = useState(JSON.parse(localStorage.getItem('role')) ? JSON.parse(localStorage.getItem('role')) : null)
    const value = {
        authentication,
        setAuthentication
    }
    return (
        <StateContext.Provider value={value}>
            {children}
        </StateContext.Provider>
    )
}
export { StateContext, StateProvider }