import "./filter-dropdown.css";
import FilterItem from "./filter-item";
import React, { useState } from "react";
import CollapseArrow from "../../assets/images/icons8-collapse-arrow-64.png";
import ExpandArrow from "../../assets/images/icons8-expand-arrow-64.png";

function FilterDropdown({
  data,
  title,
  onItemSelect,
  filtersSelected = [],
  singleSelection = false,
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleItemSelect = (itemName) => {
    onItemSelect(itemName);
  };

  return (
    <div>
      <button
        className="filter-dropdown-button pop-out"
        onClick={toggleDropdown}
      >
        {title}
        {isDropdownOpen ? (
          <img src={CollapseArrow} alt="collapse arrow" />
        ) : (
          <img src={ExpandArrow} alt="expand arrow" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="dropdown-content">
          {data.map((item, index) => (
            <FilterItem
              key={index}
              json_data={item}
              isClicked={
                singleSelection
                  ? filtersSelected === item.name
                  : filtersSelected.includes(item.name)
              }
              onClick={() => handleItemSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
