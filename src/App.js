import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlayingGrid from "./components/PlayingGrid";

function App() {
  return (
    <div className="App">
      <div id="title">
        <h1 id="title-solid">TIC TAC TOE</h1>
        <h1 id="title-deco">TIC TAC TOE</h1>
      </div>
      <PlayingGrid />
    </div>
  );
}

export default App;
