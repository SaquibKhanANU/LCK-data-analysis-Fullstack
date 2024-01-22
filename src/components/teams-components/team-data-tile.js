import './team-data-tile.css';

function TeamDataTile({label, value}) {
    return (
        <div className="team-data-tile-container">
            <div className="team-data-tile-header">
                <p id="team-data-tile-label">{label}</p>
            </div>
            <div className="team-data-tile-body">
                <p>{value}</p>
            </div>
        
        </div>
    );
}

export default TeamDataTile;