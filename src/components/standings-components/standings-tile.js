import "./standings-tile.css";

function StandingsTile({ team, rank, data }) {
  const { name, logo } = team;
  const { Wins, Losses } = data;
  return (
    <div className="standings-tile-container">
      <div className="standings-rank">{rank}.</div>
      <div className="team ">
        <img src={logo} alt="Team Logo"></img>
        <p>{name}</p>
      </div>
      <div className="standings-win-ratio">
        {Wins}-{Losses}
      </div>
    </div>
  );
}

export default StandingsTile;
