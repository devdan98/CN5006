import { useEffect } from "react"
import { useTeamsContext } from '../hooks/useTeamsContext'

// components
import TeamDetails from "../components/TeamDetails"
import TeamForm from "../components/TeamForm"

const Home = () => {
    const { footballTeams, dispatch } = useTeamsContext()
    
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch('/teams')

            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'SET_TEAMS', payload: data })
            }  
        }
        fetchTeams()
    }, [dispatch])

    return (
        <div className="home">
            <div className="teams">
                {footballTeams && footballTeams.map(team => (
                    <TeamDetails key={team._id} team={team} />
                ))}
            </div>
            <TeamForm />
        </div>
    )
}

export default Home