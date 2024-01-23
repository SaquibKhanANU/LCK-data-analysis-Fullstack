import React from "react";
import "./table-component.css";
import { useState } from "react";

const TableComponent = ({ jsonTableData, keyData }) => {
  const keys = Object.keys(jsonTableData);
  const [sortOrder, setSortOrder] = useState({
    column: "Name", // Default sorting column
    ascending: true,
  });
  const handleHeaderClick = (column) => {
    setSortOrder({
      column,
      ascending: sortOrder.column === column ? !sortOrder.ascending : false,
    });
  };

  const renderTableHeader = () => {
    if (keys.length === 0) {
      return null;
    }

    const firstKey = jsonTableData[keys[0]];
    const headers = Object.keys(firstKey);

    return (
      <>
        <th className="sticky">Name</th>
        {headers.map((header) => (
          <th key={header} onClick={() => handleHeaderClick(header)}>
            <div className="header-wrapper">
              <span>{header}</span>
              {sortOrder.column === header && (
                <span
                  className={`arrow ${sortOrder.ascending ? "down" : "up"}`}
                ></span>
              )}
            </div>
          </th>
        ))}
      </>
    );
  };

  const renderTableRows = () => {
    const sortedKeys = keys.sort((a, b) => {
      const columnValueA = jsonTableData[a][sortOrder.column];
      const columnValueB = jsonTableData[b][sortOrder.column];

      let valueA, valueB;

      // Convert string representations to appropriate types for comparison
      if (typeof columnValueA === "string") {
        if (columnValueA.includes("%")) {
          valueA = parseFloat(columnValueA.replace("%", ""));
        } else {
          valueA = parseFloat(columnValueA) || 0;
        }
      } else {
        valueA = columnValueA || 0;
      }

      if (typeof columnValueB === "string") {
        if (columnValueB.includes("%")) {
          valueB = parseFloat(columnValueB.replace("%", ""));
        } else {
          valueB = parseFloat(columnValueB) || 0;
        }
      } else {
        valueB = columnValueB || 0;
      }

      // Perform comparison based on the type of values
      if (sortOrder.ascending) {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return sortedKeys.map((tableKey) => {
      const data = keyData && keyData.find((key) => key.name === tableKey);

      return (
        <tr key={tableKey}>
          <td className="sticky-column">
            {data && <img src={data.logo} alt="Logo" />}
            {tableKey}
          </td>
          {Object.values(jsonTableData[tableKey]).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className="table-container">
      <div className="scrollable-table scroll-bar">
        <table className="data-table">
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
