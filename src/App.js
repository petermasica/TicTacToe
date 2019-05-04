import React, { Component, Fragment } from 'react';

import GameMode, { HUMAN_COMPUTER_MODE, COMPUTER_COMPUTER_MODE } from './GameMode';
import GameSummary from './GameSummary'
import './App.css';

const ROW_COLUMN_SIZE = 3;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

let timeoutId = null;

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialGameState();
  }

  componentDidUpdate(prevProps, prevState) {
    const { board: prevBoard } = prevState;
    const { board } = this.state;

    if (prevBoard !== board) {
      this.checkIfGameFinished();
    }
  }

  getInitialGameState() {
    return {
      board: Array(9).fill(null),
      mode: null,
      currentPlayer: 'x',
      winner: null,
      gameFinished: false,
      winningCombinations
    };
  }

  checkIfGameFinished() {
    const newState = { gameFinished: true };

    const winner = this.winnerExists();
    if (winner) {
      this.setState({ ...newState, winner });
      return;
    }

    const draw = this.drawExists();
    if (draw) {
      this.setState(newState);
      return;
    }

    const { mode, currentPlayer } = this.state;
    if (currentPlayer !== 'x' || mode === COMPUTER_COMPUTER_MODE) {
      this.computerTurn()
    }
  }

  getEmptyBoxes() {
    const { board } = this.state;
    return board.reduce((accumulator, box, boxIndex) => {
      if (!box) {
        accumulator.push(boxIndex);
      }
      return accumulator;
    }, []);
  }

  computerTurn() {
    const emptyBoxes = this.getEmptyBoxes();
    const boxToFill = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    timeoutId = setTimeout(() => {
      this.handleBoxClick(boxToFill);
    }, 2000);
  }

  drawExists() {
    const { board } = this.state;
    return board.every(box => box);
  }

  winnerExists() {
    const { board } = this.state;

    const winnerExists = winningCombinations.find(winningCombination => {
      const sequence = [
        board[winningCombination[0]],
        board[winningCombination[1]],
        board[winningCombination[2]]
      ];

      const allEqualInSequence = sequence.every(sequenceSymbol => sequence[0] && sequenceSymbol === sequence[0]);
      return allEqualInSequence;
    });

    return winnerExists;
  }

  handleBoxClick(index) {
    const { board, currentPlayer } = this.state;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    this.setState({
      board: updatedBoard,
      currentPlayer: currentPlayer === 'x' ? 'o' : 'x',
    });
  }

  creteBoard() {
    const { mode, currentPlayer, gameFinished, board, winner } = this.state;

    return board.map((boxContent, index) => {
      const row = Math.floor(index / ROW_COLUMN_SIZE);
      const column = index % ROW_COLUMN_SIZE;

      let classes = ['box'];

      if (row !== ROW_COLUMN_SIZE - 1) {
        classes.push('row-border');
      }

      if (column !== ROW_COLUMN_SIZE - 1) {
        classes.push('column-border');
      }

      if (mode === HUMAN_COMPUTER_MODE && !gameFinished && currentPlayer === 'x' && !boxContent) {
        classes.push('cursor');
      }

      if (winner && winner.includes(index)) {
        classes.push('winner');
      }

      const boxProps = {
        key: index,
        className: classes.join(' ')
      };

      if (classes.includes('cursor')) {
        boxProps.onClick = this.handleBoxClick.bind(this, index);
      }

      return (
        <div {...boxProps}>
          {boxContent}
        </div>
      );
    });
  }

  setGameMode = (mode) => {
    clearTimeout(timeoutId);
    timeoutId = null;
    this.setState({ ...this.getInitialGameState(), mode });
  }

  render() {
    const { board, gameFinished, winner } = this.state;

    return (
      <Fragment>
        <GameMode setGameMode={this.setGameMode} />
        <div id="board">
          {this.creteBoard()}
        </div>
        <GameSummary
          gameFinished={gameFinished}
          winner={winner && board[winner[0]]}
        />
      </Fragment>
    );
  }
}

export default TicTacToe;
