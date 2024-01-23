import PlayerDataTile from "./player-data-tile";
import "./teams-list.css";

const TeamsList = ({ teamData, color }) => {
  return (
    <div>
      <div className="teams-list-header">
        <p>{color}</p>
      </div>
      <div>
        {teamData.map((playerData, index) => (
          <PlayerDataTile key={index} player={playerData} />
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
