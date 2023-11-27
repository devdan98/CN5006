import { useEffect, useState } from 'react'

//components
import TeamDetails from '../components/TeamDetails.js'

const Home = () => {
    const [teams, setTeams] = useState(null)
    useEffect(()=>{
        const fetchFootballTeams = async () =>{
        const response = await fetch('/teams')
        const json = await response.json()
        if (response.ok){
            setTeams(json)
        }
     }

    fetchFootballTeams()
    }, [])
    return(
        <div className="Home"> 
            <div className='team'>
                {teams && teams.map((teams)=>(
                <TeamDetails key={teams._id} teams={teams}/>
                ))}   
            </div>
        </div>
    )
}

export default Home;