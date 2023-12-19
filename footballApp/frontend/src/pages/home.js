import { useState, useEffect } from 'react';
import { useTeamsContext } from '../hooks/useTeamsContext';
import TeamDetails from '../components/TeamDetails';
import TeamForm from '../components/TeamForm';

const Home = () => {
    const { footballTeams, dispatch } = useTeamsContext();
    const [yearFilter, setYearFilter] = useState('');
    const [minWinsFilter, setMinWinsFilter] = useState('');
    const [averageGoals, setAverageGoals] = useState(null);

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

    useEffect(() => {
        fetchTeams();
        // Fetch average goals when the year changes
        if (yearFilter) {
            fetchAverageGoals();
        }
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
                <div className="filter">
                    <label>Calculate Average Goals for Year:</label>
                    <input
                        type="number"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                    />
                    <button onClick={fetchAverageGoals}>Calculate</button>
                </div>
                {averageGoals && (
                    <div className="average-goals-result">
                        <p>Average Goals For: {averageGoals.averageGoalsFor}</p>
                        <p>Average Goals Against: {averageGoals.averageGoalsAgainst}</p>
                    </div>
                )}
            </div>

                {/* Display teams as before */}
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