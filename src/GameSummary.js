import React from 'react';

const GameSummary = ({ gameFinished, winner }) =>
  gameFinished &&
  <div className="game-summary">
    {winner ? `Player ${winner} won` : 'Game ends with a draw'}
  </div>;

export default GameSummary;
