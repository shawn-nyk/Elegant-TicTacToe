import React from "react";
import "./PlayingGrid.css";
import PlayingSquare from "./PlayingSquare";

class PlayingGrid extends React.Component {
  constructor() {
    super();
    this.state = {
      ownerArr: [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]],
    };
  }

  onClickHandler(r, c) {
    let newOwnerArr = [...this.state.ownerArr];
    newOwnerArr[r][c] = "player";
    this.setState({ownerArr: newOwnerArr});
    if (!this.isGameOver()) {
      this.opponentMoves();
    }
  }

  isGameOver() {
    let gameOver = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.ownerArr[i][j] == "none") {
          gameOver = false;
          break;
        }
      }
      if (!gameOver) {
        break;
      }
    }
    return gameOver;
  }

  opponentMoves() {
    let newOwnerArr = [...this.state.ownerArr];
    let randomRow = 0;
    let randomCol = 0;
    do {
      randomRow = Math.round(Math.random() * 2);
      randomCol = Math.round(Math.random() * 2);
    } while (newOwnerArr[randomRow][randomCol] != "none");
    newOwnerArr[randomRow][randomCol] = "opponent";
    this.setState({ownerArr: newOwnerArr});
  }

  reset() {
    let newOwnerArr = [["none", "none", "none"], ["none", "none", "none"], ["none", "none", "none"]];
    this.setState({ownerArr: newOwnerArr});
  }

  render() {
    return (
      <>
        <div id="playing-grid">
          <PlayingSquare id="square-1" owner={this.state.ownerArr[0][0]} onClickHandler={() => this.onClickHandler(0, 0)}/>
          <PlayingSquare id="square-2" owner={this.state.ownerArr[0][1]} onClickHandler={() => this.onClickHandler(0, 1)}/>
          <PlayingSquare id="square-3" owner={this.state.ownerArr[0][2]} onClickHandler={() => this.onClickHandler(0, 2)}/>
          <PlayingSquare id="square-4" owner={this.state.ownerArr[1][0]} onClickHandler={() => this.onClickHandler(1, 0)}/>
          <PlayingSquare id="square-5" owner={this.state.ownerArr[1][1]} onClickHandler={() => this.onClickHandler(1, 1)}/>
          <PlayingSquare id="square-6" owner={this.state.ownerArr[1][2]} onClickHandler={() => this.onClickHandler(1, 2)}/>
          <PlayingSquare id="square-7" owner={this.state.ownerArr[2][0]} onClickHandler={() => this.onClickHandler(2, 0)}/>
          <PlayingSquare id="square-8" owner={this.state.ownerArr[2][1]} onClickHandler={() => this.onClickHandler(2, 1)}/>
          <PlayingSquare id="square-9" owner={this.state.ownerArr[2][2]} onClickHandler={() => this.onClickHandler(2, 2)}/>
        </div>
        <button id="reset-button" onClick={() => this.reset()}>reset</button>
      </>
    );
  }
};

export default PlayingGrid;