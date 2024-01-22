import "./champions-body.css";
import FilterDropdown from "../global-components/filter-dropdown";
import TableComponent from "../global-components/table-component.js";
import championsData from "../../assets/data/2024_season_data/champions_data_spring.json"; 
import championsFilterData from "../../assets/data/filter_data/filter_champions.json";

function ChampionsBody() { 
  return (
    <div className="teams-body-container">
      <div className="table">
        <TableComponent jsonTableData={championsData} keyData={championsFilterData}/>
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

export default ChampionsBody;
