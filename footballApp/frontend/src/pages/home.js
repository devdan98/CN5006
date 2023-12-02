import { useEffect, useState } from "react"

// components
import TeamDetails from "../components/TeamDetails"
import TeamForm from "../components/TeamForm"

const Home = () => {
    const [footballTeams, setFootballTeams] = useState(null)

    useEffect(() => {
        const fetchTeams = async () => {
            const res = await fetch('/teams')
            const json = await res.json()

            if (res.ok) {
                setFootballTeams(json)
            }
        }

        fetchTeams()
    }, [])

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