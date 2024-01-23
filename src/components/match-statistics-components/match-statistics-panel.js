import GamesSelectorNavbar from "./games-navbar";
import TeamsVersus from "./teams-versus-names";
import BansList from "./bans-list";
import TeamsList from "./teams-list";
import "./match-statistics-panel.css";

function MatchStatisticsPanel({ event, onGameLinkChange, data }) {
  const {
    teams,
    games,
    team1,
    score,
    team2,
    week,
    patch,
    date,
    logo1,
    logo2,
    shorthand1,
    shorthand2,
  } = event;
  const team1_object = { team1, logo1, shorthand1 };
  const team2_object = { team2, logo2, shorthand2 };

  return (
    <div className="match-statistics-panel scroll-bar">
      <div className="team-names">
        <TeamsVersus team1_object={team1_object} team2_object={team2_object} />
      </div>

      <div className="games">
        {" "}
        <GamesSelectorNavbar
          games={games}
          onGameLinkChange={onGameLinkChange}
        />
      </div>
      <div className="teams">
        <div className="blue">
          {data.team_data && <TeamsList teamData={data.team_data.team_1} color={"BLUE"} />}
        </div>
        <div className="bans">
          {data.team_bans && (
            <>
              <BansList teamBans={data.team_bans} />
            </>
          )}
        </div>
        <div className="red">
          {data.team_data && <TeamsList teamData={data.team_data.team_2} color={"RED"} />}
        </div>
      </div>
    </div>
  );
}

export default MatchStatisticsPanel;
