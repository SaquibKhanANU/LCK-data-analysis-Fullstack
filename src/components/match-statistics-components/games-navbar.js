import "./games-navbar.css";

function GamesSelectorNavbar({ games }) {
  const handleButtonClick = (gameDataLink) => {
    // Call the mineGameData function with the game_data_link
    mineGameData(gameDataLink);
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
