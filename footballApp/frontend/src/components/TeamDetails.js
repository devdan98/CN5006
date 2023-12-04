import { useState } from 'react'
import { useTeamsContext } from '../hooks/useTeamsContext'

const TeamDetails = ({ team }) => {
    const { dispatch } = useTeamsContext()
    const [isEditing, setIsEditing] = useState(false)
    const [editedTeam, setEditedTeam] = useState({ ...team })

    const handleClick = async() => {
        const response = await fetch('/teams/' + team._id, {
            method: 'DELETE'
        })

        if (response.ok) {
            dispatch({ type: 'DELETE_TEAM', payload: team })
        }
    }

    const handleEditClick = async() => {
        setIsEditing(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTeam((prevTeam) => ({ ...prevTeam, [name]: value }));
    }

    // UpdateFootballTeam component
    const handleUpdateClick = async (e) => {
        e.preventDefault();
    
        const response = await fetch('/teams/' + team._id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedTeam)
        });
    
        const json = await response.json();
    
        if (response.ok) {
          dispatch({ type: 'UPDATE_TEAM', payload: json });
          setIsEditing(false);
        }
    };
    



    return(
        <div className="teams-details">
            <h4>{team.team}</h4>
            <p><strong>Games Played: </strong>{team.gamesPlayed}</p>
            <p><strong>Wins: </strong>{team.wins}</p>
            <p><strong>Draws: </strong>{team.draw}</p>
            <p><strong>Losses: </strong>{team.loss}</p>
            <p><strong>Goals For: </strong>{team.goalsFor}</p>
            <p><strong>Goals Against: </strong>{team.goalsAgainst}</p>
            <p><strong>Points: </strong>{team.points}</p>
            <p><strong>Year: </strong>{team.year}</p>
            <span className="material-symbols-outlined delete" onClick={handleClick}>Delete</span>
            <span className="material-symbols-outlined edit" onClick={handleEditClick}>Edit</span>

            {isEditing && (
                <form onSubmit={handleUpdateClick}>
                    <input type="text" name="team" value={editedTeam.team} onChange={handleInputChange} />
                    <input type="number" name="gamesPlayed" value={editedTeam.gamesPlayed} onChange={handleInputChange} />
                    <input type="number" name="wins" value={editedTeam.wins} onChange={handleInputChange} />
                    <input type="number" name="draw" value={editedTeam.draw} onChange={handleInputChange} />
                    <input type="number" name="loss" value={editedTeam.loss} onChange={handleInputChange} />
                    <input type="number" name="goalsFor" value={editedTeam.goalsFor} onChange={handleInputChange} />
                    <input type="number" name="goalsAgainst" value={editedTeam.goalsAgainst} onChange={handleInputChange} />
                    <input type="number" name="points" value={editedTeam.points} onChange={handleInputChange} />
                    <input type="number" name="year" value={editedTeam.year} onChange={handleInputChange} />
                    <button type="submit">Update</button>
                </form>
            )}
            
        </div>
    )
}

export default TeamDetails