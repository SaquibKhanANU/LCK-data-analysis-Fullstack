import GamesSelectorNavbar from "./games-navbar";
import TeamsVersus from "./teams-versus-names";
import "./match-statistics-panel.css";

function MatchStatisticsPanel({event}) {
    const {teams, games, team1, score, team2, week, patch, date, logo1, logo2, shorthand1, shorthand2 } = event;
    const team1_object = {team1, logo1, shorthand1};
    const team2_object = {team2, logo2, shorthand2};

  return (
    <div className="match-statistics-panel">
      <div className="team-names">
          <TeamsVersus team1_object={team1_object} team2_object={team2_object}/>
      </div>

      <div className="games">
        {" "}
        <GamesSelectorNavbar games={games} />
      </div>
      <div className="teams">
        <div className="team team1"></div>
        <div className="bans"></div>
        <div className="team team2"></div>
      </div>
    </div>
  );
}

export default MatchStatisticsPanel;
