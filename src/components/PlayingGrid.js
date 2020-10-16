import React from "react";
import "./PlayingGrid.css";
import PlayingSquare from "./PlayingSquare";

class PlayingGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      gameState: [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]],
      gameOver: false,
      winner: "none"
    };
  }

  onClickHandler(r, c) {
    let newGameState = [...this.state.gameState];
    let gameOver = this.state.gameOver;
    let winner = this.state.winner;
    if (gameOver || newGameState[r][c] != "none") {
      return;
    }
    newGameState[r][c] = "player";
    winner = this.checkWinner(newGameState);
    if (winner != "none" || this.checkBoardFilled(newGameState)) {
      gameOver = true;
    }
    if (!gameOver) {
      newGameState = this.opponentMoves(newGameState);
    }
    winner = this.checkWinner(newGameState);
    if (winner != "none" || this.checkBoardFilled(newGameState)) {
      gameOver = true;
    }
    this.setState({gameState: newGameState, gameOver: gameOver, winner: winner});
  }

  checkWinner(gameState) {
    let winner = "none";
    for (let i = 0; i < 3; i++) {
      if ((gameState[0][i] != "none") && (gameState[0][i] == gameState[1][i]) && (gameState[1][i] == gameState[2][i])) {
        winner = gameState[0][i];
        break;
      }
      if ((gameState[i][0] != "none") && (gameState[i][0] == gameState[i][1]) && (gameState[i][1] == gameState[i][2])) {
        winner = gameState[i][0];
        break;
      }
    }
    if ((gameState[0][0] != "none") && (gameState[0][0] == gameState[1][1]) && (gameState[1][1] == gameState[2][2])) {
      winner = gameState[0][0];
    }
    if ((gameState[0][2] != "none") && (gameState[0][2] == gameState[1][1]) && (gameState[1][1] == gameState[2][0])) {
      winner = gameState[0][2];
    }
    return winner;
  }

  checkBoardFilled(gameState) {
    let boardFilled = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameState[i][j] == "none") {
          boardFilled = false;
          break;
        }
      }
      if (!boardFilled) {
        break;
      }
    }
    return boardFilled;
  }

  opponentMoves(newGameState) {
    let randomRow = 0;
    let randomCol = 0;
    do {
      randomRow = Math.round(Math.random() * 2);
      randomCol = Math.round(Math.random() * 2);
    } while (newGameState[randomRow][randomCol] != "none");
    newGameState[randomRow][randomCol] = "opponent";
    return newGameState;
  }

  newGame() {
    let newGameState = [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]];
    this.setState({gameState: newGameState, gameOver: false, winner: "none"});
  }

  render() {
    const visibility = this.state.gameOver ? "visible" : "hidden";
    const gameOverMessage = this.state.winner != "player" ? "Better luck next time!" : "Congratulations! You won!"; 
    return (
      <>
        <h1 style={{visibility: visibility}} id="game-over-title">{gameOverMessage}</h1>
        <div id="playing-grid">
          <PlayingSquare id="square-1" owner={this.state.gameState[0][0]} onClickHandler={() => this.onClickHandler(0, 0)}/>
          <PlayingSquare id="square-2" owner={this.state.gameState[0][1]} onClickHandler={() => this.onClickHandler(0, 1)}/>
          <PlayingSquare id="square-3" owner={this.state.gameState[0][2]} onClickHandler={() => this.onClickHandler(0, 2)}/>
          <PlayingSquare id="square-4" owner={this.state.gameState[1][0]} onClickHandler={() => this.onClickHandler(1, 0)}/>
          <PlayingSquare id="square-5" owner={this.state.gameState[1][1]} onClickHandler={() => this.onClickHandler(1, 1)}/>
          <PlayingSquare id="square-6" owner={this.state.gameState[1][2]} onClickHandler={() => this.onClickHandler(1, 2)}/>
          <PlayingSquare id="square-7" owner={this.state.gameState[2][0]} onClickHandler={() => this.onClickHandler(2, 0)}/>
          <PlayingSquare id="square-8" owner={this.state.gameState[2][1]} onClickHandler={() => this.onClickHandler(2, 1)}/>
          <PlayingSquare id="square-9" owner={this.state.gameState[2][2]} onClickHandler={() => this.onClickHandler(2, 2)}/>
        </div>
        <button id="reset-button" onClick={() => this.newGame()}>New Game</button>
      </>
    );
  }
};

export default PlayingGrid;