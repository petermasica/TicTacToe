import React from 'react';

export const HUMAN_COMPUTER_MODE = 'human-computer';
export const COMPUTER_COMPUTER_MODE = 'computer-computer';

const GameMode = ({ setGameMode }) => {
  const handleModeSelection = (event) => {
    event.preventDefault();
    setGameMode(event.target.mode.value);
  };

  return (
    <form className="game-mode" onSubmit={handleModeSelection}>
      <label>
        Human vs Computer
        <input type="radio" name="mode" value={HUMAN_COMPUTER_MODE} defaultChecked />
      </label>
      <label>
        Computer Simulation
        <input type="radio" name="mode" value={COMPUTER_COMPUTER_MODE} />
      </label>
      <input type="submit" value="start new game" />
    </form>
  );
};

export default GameMode;
