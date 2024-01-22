import "./teams-body.css";
import FilterDropdown from "../global-components/filter-dropdown";
import teamFilterData from "../../assets/data/filter_data/filter_teams.json"; // Replace with the correct path to your JSON file
import seasonFilterData from "../../assets/data/filter_data/filter_seasons.json"; // Replace with the correct path to your JSON file
import teamData from "../../assets/data/2024_season_data/team_data_spring.json"; // Replace with the correct path to your JSON file
import { useState, useEffect } from "react";
import TableComponent from "../global-components/table-component.js";

function TeamsBody() { 
  return (
    <div className="teams-body-container">
      <div className="table">
        <TableComponent jsonTableData={teamData} keyData={teamFilterData}/>
      </div>
      <div className="filter-container">
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

export default TeamsBody;
