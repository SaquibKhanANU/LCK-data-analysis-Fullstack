import EventMatchTile from "./event-match";
import "./events.css";

import teamData from "../../assets/data/filter_data/filter_teams.json"; // Replace with the correct path to your JSON file
import seasonData from "../../assets/data/filter_data/filter_seasons.json"; // Replace with the correct path to your JSON file
import FilterDropdown from "../global-components/filter-dropdown";
import { useState, useEffect } from "react";

/* SPLIUT THIS UP*/

function EventsTab() {
  const [selectedSeason, setSelectedSeason] = useState("Spring");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [data, setData] = useState([]);

  const handleTeamSelect = async (team) => {
    // Update the selected teams
    setSelectedTeams((prevSelectedTeams) => {
      const isSelected = prevSelectedTeams.includes(team.name);

      if (isSelected) {
        // Remove the team if it's already selected
        return prevSelectedTeams.filter(
          (selectedTeam) => selectedTeam !== team.name
        );
      } else {
        // Add the team to the selected teams
        return [...prevSelectedTeams, team.name];
      }
    });
  };

  const handleSeasonSelect = async (season) => {
    try {
      setSelectedSeason(season.name);
    } catch (error) {
      console.error("Error handling season selection:", error);
    }
  };

  const filterMatches = (event) => {
    // Check if any selected team matches with team1 or team2
    return (
      selectedTeams.length === 0 ||
      selectedTeams.some((team) => event.team1 === team || event.team2 === team)
    );
  };

  const importSeasonData = async (name) => {
    let fileName = null;
    switch (name) {
      case "Spring":
        fileName = "spring_data";
        break;
      case "Spring Playoffs":
        fileName = "spring_playoffs_data";
        break;
      case "Summer":
        fileName = "summer_data";
        break;
      case "Summer Playoffs":
        fileName = "summer_playoffs_data";
        break;
      case "Regionals":
        fileName = "regionals_data";
        break;
      default:
        break;
    }

    try {
      const module = await import(
        `../../assets/data/2024_season_data/${fileName}.json`
      );
      return module.default;
    } catch (error) {
      console.error("Error loading season data:", error);
      return null; // Return null or handle the error as appropriate
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const seasonData = await importSeasonData(selectedSeason);
      if (seasonData) {
        setData(seasonData);
      }
    };
    fetchData();
  }, [selectedSeason]);

  const filteredMatches = data.filter(filterMatches);
  const sortedMatches = filteredMatches
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="events-body">
      <div className="events-container scroll-bar">
        {sortedMatches.map((event, index) => (
          <EventMatchTile key={index} event={event} />
        ))}
      </div>
      <div className="filter-container scroll-bar">
        <div className="filter-items">
          <div className="filter-header">
            <h2>Filter</h2>
          </div>
          <div className="filter-dropdowns">
            <FilterDropdown
              data={teamData}
              title="TEAMS"
              filtersSelected={selectedTeams}
              onItemSelect={handleTeamSelect}
            />
            <FilterDropdown
              data={seasonData}
              title="SEASONS"
              onItemSelect={handleSeasonSelect}
              filtersSelected={selectedSeason}
              singleSelection={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsTab;
