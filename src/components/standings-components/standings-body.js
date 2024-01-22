import "./standings-body.css";
import StandingsTile from "./standings-tile.js";
import FilterDropdown from "../global-components/filter-dropdown";

import standingsData from "../../assets/data/2024_season_data/standings_data_spring.json";
import teamFilterData from "../../assets/data/filter_data/filter_teams.json"; // Replace with the correct path to your JSON file
import seasonFilterData from "../../assets/data/filter_data/filter_seasons.json"; // Replace with the correct path to your JSON file

import { useState } from "react";
function StandingsBody() {
  const [selectedSeason, setSelectedSeason] = useState("Spring");
  const handleSeasonSelect = async (season) => {
    try {
      setSelectedSeason(season);
    } catch (error) {
      console.error("Error handling season selection:", error);
    }
  };

  const sortedTeams = Object.keys(standingsData).sort((a, b) => {
    // Sort based on the number of Wins (descending order)
    return standingsData[b].Wins - standingsData[a].Wins;
  });

  return (
    <div className="standings-body-container">
      <div className="standings-container">
        {sortedTeams.map((teamName, index) => (
          <StandingsTile
            key={teamName}
            rank={index + 1}
            team={teamFilterData.find((t) => t.name === teamName)}
            data={standingsData[teamName]}
          />
        ))}
      </div>
      <div className="filter-container">
        <div className="filter-items">
          <div className="filter-header">
            <h2>Filter</h2>
          </div>
          <div className="filter-dropdowns">
            <FilterDropdown
              data={seasonFilterData}
              title="SEASONS"
              onItemSelect={handleSeasonSelect}
              filtersSelected={selectedSeason.name}
              singleSelection={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StandingsBody;
