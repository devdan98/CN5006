import { createContext, useReducer } from "react";

export const TeamsContext = createContext()

export const TeamsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TEAMS':
            return {
                footballTeams: action.payload
            };
        case 'CREATE_TEAMS':
            return {
                footballTeams: [action.payload, ...state.footballTeams]
            };
        case 'DELETE_TEAM':
            return {
                footballTeams: state.footballTeams.filter((t) => t._id !== action.payload._id)
            };
        case 'UPDATE_TEAM':
            return {
                footballTeams: state.footballTeams.map((t) =>
                    t._id === action.payload._id ? { ...action.payload } : t
                )
            };
        default:
            return state
    }
};

export const TeamsContextProvider = ({ children }) => {
    const[state, dispatch] = useReducer(TeamsReducer,{
        footballTeams: null
    })

    return (
        <TeamsContext.Provider value={{...state, dispatch}}>
          { children }  
        </TeamsContext.Provider>
    )
}