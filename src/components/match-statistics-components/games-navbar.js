import "./games-navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function GamesSelectorNavbar({ games, onGameLinkChange }) {
  const handleButtonClick = (gameDataLink) => {
    // Call the membners function
    onGameLinkChange(gameDataLink);
  };

  const gameButtons = games
    .filter(
      (game) => game.game_number !== "Preview" && game.game_number !== "Summary"
    )
    .map((game, index) => (
      <button
        key={index}
        className="game-selector-button"
        onClick={() => handleButtonClick(game.game_data_link)}
      >
        {index + 1}
      </button>
    ));

  return (
    <div className="game-selector">
      <div className="game-selector-title">
        <p>GAME</p>
      </div>
      <div className="game-selector-buttons">{gameButtons}</div>
    </div>
  );
}

export default GamesSelectorNavbar;
