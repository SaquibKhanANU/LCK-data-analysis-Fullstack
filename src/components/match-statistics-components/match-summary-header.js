import React from "react";
import "./match-summary-header.css";

function MatchSummaryHeader({ data }) {
  const renderTeamSummary = (teamKey) => {
    if (!data["1"] | !data["2"]) {
      return null;
    }

    const {
      Drakes,
      Kills,
      Towers,
      Dragons,
      Nashor,
      "Team Gold": TeamGold,
    } = data[teamKey];

    return (
      <div className="team-data" key={teamKey}>
        <p>Kills: {Kills}</p>
        <p>Towers: {Towers}</p>
        <p>Dragons: {Dragons}</p>
        <p>Nashor: {Nashor}</p>
        <p>Team Gold: {TeamGold}</p>
      </div>
    );
  };

  return (
    <div className="team-data-container">
      <div className="team-versus team1-versus">{[1].map((teamKey) => renderTeamSummary(String(teamKey)))}</div>
      <div className="vs">vs</div>
      <div className="team-versus team2-versus">{[2].map((teamKey) => renderTeamSummary(String(teamKey)))}</div>
    </div>
  );
}

export default MatchSummaryHeader;
