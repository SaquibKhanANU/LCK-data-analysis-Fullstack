import { NavLink } from "react-router-dom";
import "./event-match.css";

function EventMatchTile({ event }) {
  const {teams, games, team1, score, team2, week, patch, date, logo1, logo2 } = event;
  const eventJson = encodeURIComponent(JSON.stringify(event));

  return (
    <NavLink to={`/match-statistics?event=${eventJson}`} className="match-link">
      <div className="match pop-out">
        <div className="date column-1">
          <p>{date}</p>
          <p>{patch}</p>
          <p id="week">{week} </p>
        </div>
        <div className="teams column-2">
          <div className="team team1">
            <p>{team1}</p>
            <img src={logo1} alt="Team 1 Logo"></img>
          </div>
          <div class="score">{score}</div>
          <div className="team team2">
            <img src={logo2} alt="Team 2 Logo"></img>
            <p>{team2}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default EventMatchTile;
