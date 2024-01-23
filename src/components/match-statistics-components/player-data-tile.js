import './player-data-tile.css';
import championsFilterData from '../../assets/data/filter_data/filter_champions.json';

const PlayerDataTile = ({ player }) => {
    const championData = championsFilterData.find(
        (data) => data.name === player.Champion
      );
      
    return (
      <div className="player-data-tile-container" key={player.Player}>
        <img className='champion-player-image' src={championData.logo} alt={player.Champion} />
        <p class="player-name">{`${player.Player}`}</p>
        <p class="kda">{`${player.KDA}`}</p>
        <p>{`${player.CS}`}</p>
        {/* Add more properties as needed */}
      </div>
    );
  };

export default PlayerDataTile;