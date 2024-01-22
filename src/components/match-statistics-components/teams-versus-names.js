import "./teams-versus-names.css";

function TeamsVersus({ team1_object, team2_object }) {
  const { team1, logo1, shorthand1 } = team1_object;
  const { team2, logo2, shorthand2 } = team2_object;

  return (
    <div className="teams-versus-container">
      <div className="team-versus team1-versus">
        <p>{shorthand1}</p>
        <img src={logo1} alt="Team 1 Logo"></img>
      </div>
      <div className="vs">VS</div>
      <div className="team-versus team2-versus">
        <img src={logo2} alt="Team 2 Logo"></img>
        <p>{shorthand2}</p>
      </div>
    </div>
  );
}

export default TeamsVersus;
