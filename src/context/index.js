import { createContext, useReducer } from "react";

export const Context = createContext()
const initState = {
    user: {},
    userId: null,
    admin: false,
    loggedInUser: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_DETAIL': {
            return { ...state, user: action.payload.values }
        } case "USER_ID": {
            return { ...state, userId: action.payload.values }
        } case "LOGOUT": {
            return { ...state, user: {}, userId: null }
        } case "SET_ADMIN": {
            return { ...state, admin: action.payload }
        } case "SET_AUTH": {
            return { ...state, loggedInUser: action.payload }
        }
    }
}

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}