import { useState, useEffect } from 'react';
import { useTeamsContext } from '../hooks/useTeamsContext';
import TeamDetails from '../components/TeamDetails';
import TeamForm from '../components/TeamForm';

const Home = () => {
    const { footballTeams, dispatch } = useTeamsContext();
    const [yearFilter, setYearFilter] = useState('');
    const [minWinsFilter, setMinWinsFilter] = useState('');
    const [averageGoals, setAverageGoals] = useState(null);
    const [totalStats, setTotalStats] = useState(null);

    const fetchTeams = async () => {
        const response = await fetch(`/teams?year=${yearFilter}&minWins=${minWinsFilter}`);

        if (response.ok) {
            const data = await response.json();
            dispatch({ type: 'SET_TEAMS', payload: data });
        }
    }

    const fetchAverageGoals = async () => {
        const response = await fetch(`/teams/average-goals/${yearFilter}`);

        if (response.ok) {
            const data = await response.json();
            setAverageGoals(data);
        } else {
            setAverageGoals(null);
        }
    };

    const fetchTotalStats = async () => {
        const response = await fetch(`/teams/total-stats/${yearFilter}`);

        if (response.ok) {
            const data = await response.json();
            setTotalStats(data);
        } else {
            setTotalStats(null);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [yearFilter, minWinsFilter, dispatch]);

    return (
        <div className="home">
            <div className="teams">
                <div className="filter">
                    <label>Filter by Year:</label>
                    <input
                        type="number"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                    />
                </div>
                <div className="filter">
                    <label>Min Wins:</label>
                    <input
                        type="number"
                        value={minWinsFilter}
                        onChange={(e) => setMinWinsFilter(e.target.value)}
                    />
                </div>
                <div className="average-goals">
                    <button onClick={fetchAverageGoals}>Year Avg Goals</button>
                    <button className="padme" onClick={fetchTotalStats}>Year Stats</button>
                {averageGoals && (
                    <div className="average-goals-result">
                        <p>Average Goals For: {averageGoals.averageGoalsFor}</p>
                        <p>Average Goals Against: {averageGoals.averageGoalsAgainst}</p>
                    </div>
                )}
                {totalStats && (
                <div className="total-stats-result">
                    <p>Total Games Played: {totalStats.totalGamesPlayed}</p>
                    <p>Total Wins: {totalStats.totalWins}</p>
                    <p>Total Draws: {totalStats.totalDraws}</p>
                </div>
            )}
            </div>

                {footballTeams && footballTeams.map(team => (
                    <TeamDetails key={team._id} team={team} />
                ))}
            </div>
            <TeamForm />
            <div className="filters">
            </div>
        </div>
    );
}

export default Home;