import { useState } from "react"

const TeamForm = () => {
    const [team, setTeam] = useState('')
    const [gamesPlayed, setGamesPlayed] = useState('')
    const [wins, setWins] = useState('')
    const [draws, setDraws] = useState('')
    const [loss, setLoss] = useState('')
    const [goalsFor, setGoalsFor] = useState('')
    const [goalsAgainst, setGoalsAgainst] = useState('')
    const [points, setPoints] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState('null')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const footballTeam = { team, gamesPlayed, wins, draws, loss, goalsFor, goalsAgainst, points, year }

        const res = await fetch('/teams', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(footballTeam)
        })
        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
        }
        if (res.ok) {
            setTeam('')
            setGamesPlayed('')
            setWins('')
            setDraws('')
            setLoss('')
            setGoalsFor('')
            setGoalsAgainst('')
            setPoints('')
            setYear('')
            setError(null)
            console.log('New team added', json)
        }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Team</h3>

            <label>Team Name:</label>
            <input 
                type="text"
                onChange={(e) => setTeam(e.target.value)}
                value={team}
            />

            <label>Games Played:</label>
            <input 
                type="number"
                onChange={(e) => setGamesPlayed(e.target.value)}
                value={gamesPlayed}
            />

            <label>Wins:</label>
            <input 
                type="number"
                onChange={(e) => setWins(e.target.value)}
                value={wins}
            />

            <label>Draws:</label>
            <input 
                type="number"
                onChange={(e) => setDraws(e.target.value)}
                value={draws}
            />

            <label>Losses:</label>
            <input 
                type="number"
                onChange={(e) => setLoss(e.target.value)}
                value={loss}
            />

            <label>Goals For:</label>
            <input 
                type="number"
                onChange={(e) => setGoalsFor(e.target.value)}
                value={goalsFor}
            />

            <label>Goals Against:</label>
            <input 
                type="number"
                onChange={(e) => setGoalsAgainst(e.target.value)}
                value={goalsAgainst}
            />

            <label>Points:</label>
            <input 
                type="number"
                onChange={(e) => setPoints(e.target.value)}
                value={points}
            />

            <label>Year:</label>
            <input 
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
            />

            <button>Add Team</button>
        </form>

    )
}

export default TeamForm