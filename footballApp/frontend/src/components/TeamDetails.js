const TeamDetails = ({teams}) =>{
    return(
        <div className="teams-details">
            <h4>{teams.team}</h4>
            <p><strong>Games Played: </strong>{teams.gamesPlayed}</p>
            <p><strong>Wins: </strong>{teams.wins}</p>
            <p><strong>Draws: </strong>{teams.draw}</p>
            <p><strong>Losses: </strong>{teams.loss}</p>
            <p><strong>Goals For: </strong>{teams.goalsFor}</p>
            <p><strong>Goals Against: </strong>{teams.goalsAgainst}</p>
            <p><strong>Points: </strong>{teams.points}</p>
            <p><strong>Year: </strong>{teams.year}</p>
        </div>
    )
}

export default TeamDetails