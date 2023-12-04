import { useState } from "react"
import { useTeamsContext } from '../hooks/useTeamsContext';

const TeamForm = () => {
    const {dispatch} = useTeamsContext()
    
    const [team, setTeam] = useState('')
    const [gamesPlayed, setGamesPlayed] = useState('')
    const [wins, setWins] = useState('')
    const [draw, setDraw] = useState('')
    const [loss, setLoss] = useState('')
    const [goalsFor, setGoalsFor] = useState('')
    const [goalsAgainst, setGoalsAgainst] = useState('')
    const [points, setPoints] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFeilds] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const footballTeam = { team, gamesPlayed, wins, draw, loss, goalsFor, goalsAgainst, points, year }

        const response = await fetch('/teams', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(footballTeam)
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFeilds(json.emptyFields)
        }
        if (response.ok) {
            setTeam('')
            setGamesPlayed('')
            setWins('')
            setDraw('')
            setLoss('')
            setGoalsFor('')
            setGoalsAgainst('')
            setPoints('')
            setYear('')
            setError(null)
            setEmptyFeilds([])
            console.log('New team added', json)
            dispatch({type:'CREATE_TEAMS', payload:json})
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
                className={emptyFields.includes('team') ? 'error' : ''}
            />

            <label>Games Played:</label>
            <input 
                type="number"
                onChange={(e) => setGamesPlayed(e.target.value)}
                value={gamesPlayed}
                className={emptyFields.includes('gamesPlayed') ? 'error' : ''}
            />

            <label>Wins:</label>
            <input 
                type="number"
                onChange={(e) => setWins(e.target.value)}
                value={wins}
                className={emptyFields.includes('wins') ? 'error' : ''}

            />

            <label>Draws:</label>
            <input 
                type="number"
                onChange={(e) => setDraw(e.target.value)}
                value={draw}
                className={emptyFields.includes('draw') ? 'error' : ''}
            />

            <label>Losses:</label>
            <input 
                type="number"
                onChange={(e) => setLoss(e.target.value)}
                value={loss}
                className={emptyFields.includes('loss') ? 'error' : ''}
            />

            <label>Goals For:</label>
            <input 
                type="number"
                onChange={(e) => setGoalsFor(e.target.value)}
                value={goalsFor}
                className={emptyFields.includes('goalsFor') ? 'error' : ''}
            />

            <label>Goals Against:</label>
            <input 
                type="number"
                onChange={(e) => setGoalsAgainst(e.target.value)}
                value={goalsAgainst}
                className={emptyFields.includes('goalsAgainst') ? 'error' : ''}
            />

            <label>Points:</label>
            <input 
                type="number"
                onChange={(e) => setPoints(e.target.value)}
                value={points}
                className={emptyFields.includes('points') ? 'error' : ''}
            />

            <label>Year:</label>
            <input 
                type="number"
                onChange={(e) => setYear(e.target.value)}
                value={year}
                className={emptyFields.includes('year') ? 'error' : ''}
            />
            <button>Add Team</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}

export default TeamForm