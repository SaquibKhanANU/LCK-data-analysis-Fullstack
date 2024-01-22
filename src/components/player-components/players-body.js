import "./players-body.css";
import PlayerTable from "../global-components/table-component";
import playerData from "../../assets/data/2024_season_data/player_data_spring.json";
import FilterDropdown from "../global-components/filter-dropdown";
import  { useState, useEffect } from 'react';

function PlayersBody() {
    
  return (
    <div className="player-body-container">
      <div className="table">
        <PlayerTable jsonTableData={playerData}/>
      </div>
      <div className="filter-container scroll-bar">
        <div className="filter-items">
          <div className="filter-header">
            <h2>Filter</h2>
          </div>
          <div className="filter-dropdowns">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayersBody;
