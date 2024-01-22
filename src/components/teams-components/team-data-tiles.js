import './team-data-tiles.css'; 
import TeamDataTile from './team-data-tile'; 

function TeamDataTiles({ data }) {
  return (
    <div className='team-data-tiles-container'>
      {Object.entries(data).map(([label, value]) => (
        <TeamDataTile key={label} label={label} value={value} />
      ))}
    </div>
  );
}

export default TeamDataTiles;
