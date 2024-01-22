import './team-banner.css';
import TeamDataTiles from './team-data-tiles';
import { useState } from 'react';

function TeamBanner({team, data}) {
    const {name, logo} = team;
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleBannerClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

      
    return (
        <div className="team-banner-container " onClick={handleBannerClick}>
            <div className='team-banner pop-out'>
                <img src={logo} alt="Team Logo"></img>
                <p>{name}</p>
            </div>
            <div>
            {isDropdownOpen && <TeamDataTiles data={data} />}
            </div>
        </div>
       
    );
}

export default TeamBanner;