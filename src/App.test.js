import React from 'react';
import App from './App';

import { mount } from 'enzyme';

const checkIfGameStateMatchesRenderedBoard = (board) => {
  const game = mount(<App />);
  game.setState({ board });
  game.update();

  const boardFields = game.find('.box');
  boardFields.forEach((field, index) => {
    const fieldSymbol = field.text();
    if (fieldSymbol) {
      expect(fieldSymbol).toBe(board[index]);
    } else {
      expect(board[index]).toBe(null);
    }
  });

  return game;
};

describe('Tic Tac Toe game', () => {
  it('should render empty board', () => {
    const game = mount(<App />);
    const boardFields = game.find('.box');
    boardFields.forEach((field, index) => {
      const fieldSymbol = field.text();
      expect(fieldSymbol).toBe('');
      expect(game.state().board[index]).toBeNull();
    });

    const gameSummary = game.find('.game-summary');
    expect(gameSummary.length).toBe(0);
  });

  it('player "x" should win with a vertical line', () => {
    const updatedBoard = ['x', null, null, 'x', 'o', null, 'x', null, 'o'];

    const game = checkIfGameStateMatchesRenderedBoard(updatedBoard);
    const gameSummary = game.find('.game-summary');

    expect(gameSummary.length).toBe(1);
    expect(gameSummary.at(0).text()).toBe('Player x won');
  });

  it('player "o" should win with a horizontal line', () => {
    const updatedBoard = ['x', null, 'x', 'o', 'o', 'o', 'x', null, null];

    const game = checkIfGameStateMatchesRenderedBoard(updatedBoard);
    const gameSummary = game.find('.game-summary');

    expect(gameSummary.length).toBe(1);
    expect(gameSummary.at(0).text()).toBe('Player o won');
  });

  it('player "x" should win with a diagonal line', () => {
    const updatedBoard = ['x', null, null, 'o', 'x', null, 'o', null, 'x'];

    const game = checkIfGameStateMatchesRenderedBoard(updatedBoard);
    const gameSummary = game.find('.game-summary');

    expect(gameSummary.length).toBe(1);
    expect(gameSummary.at(0).text()).toBe('Player x won');
  });

  it('the game should end with a draw', () => {
    const updatedBoard = ['x', 'o', 'x', 'o', 'o', 'x', 'x', 'x', 'o'];

    const game = checkIfGameStateMatchesRenderedBoard(updatedBoard);
    const gameSummary = game.find('.game-summary');

    expect(gameSummary.length).toBe(1);
    expect(gameSummary.at(0).text()).toBe('Game ends with a draw');
  });
});
