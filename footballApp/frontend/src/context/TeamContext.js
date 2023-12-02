import { createContext, useReducer } from "react";

export const TeamsContext = createContext()

export const TeamsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TEAMS' :
            return{
                footballTeams: action.payload
            }
        case 'CREATE_TEAMS' :
            return{
                footballTeams: [action.payload, ...state.footballTeams]
            }
        case 'DELETE_TEAMS' :
                return{
                    footballTeams: state.footballTeams.filter((t)=> t._id !== action.payload._id)
            }
        default :
        return state
    }
}

export const TeamsContextProvider = ({ children })=>{
    const[state, dispatch] = useReducer(TeamsReducer,{
        footballTeams: null
    })

    return (
        <TeamsContext.Provider value={{...state,dispatch}}>
          { children }  
        </TeamsContext.Provider>
    )
}