import { TeamsContext } from '../context/TeamContext';
import {useContext} from 'react'

export const useTeamsContext = () => {
    const context = useContext(TeamsContext)

    if(!context){
        throw Error('useTeamsContext must be used inside an TeamsContextProvider')
    }

    return context
}