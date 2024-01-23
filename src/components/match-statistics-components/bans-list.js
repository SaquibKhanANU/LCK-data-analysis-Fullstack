import React from 'react';
import championsFilterData from '../../assets/data/filter_data/filter_champions.json';
import './bans-list.css';

const BansList = ({ teamBans }) => {
  const numberOfBans = Object.values(teamBans).reduce((acc, curr) => acc + Object.values(curr).length, 0);
  const imageWidthPercentage = 100 / numberOfBans;

  return (
    <div className="bans-list-container">
      <div className='bans-list-header'>
        <p>BANS</p>
      </div>
      {Object.keys(teamBans).map((teamNumber, index) => (
        <div key={teamNumber} className="team-bans-list">
          <ul className="champion-list">
            {Object.values(teamBans[teamNumber]).map((champion, index) => {
              // Find the champion data in championsFilterData
              const championData = championsFilterData.find(
                (data) => data.name === champion
              );

              if (championData) {
                return (
                  <li key={index}>
                    <img className='champion-ban-image' src={championData.logo} alt={champion} />
                  </li>
                );
              } else {
                return null; // Handle the case where champion data is not found
              }
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BansList;
