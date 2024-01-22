import "./filter-item.css";
import { useState } from "react";

function FilterItem({ json_data, isClicked, onClick }) {
  const { name, logo } = json_data;

  return (
    <div className="filter-item" onClick={onClick}>
      <div className={`item pop-out ${isClicked ? "clicked" : ""}`}>
        <img src={logo} alt="logo"></img>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default FilterItem;
