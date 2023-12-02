const TeamDetails = ({ team }) => {
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
        </div>
    )
}

export default TeamDetails