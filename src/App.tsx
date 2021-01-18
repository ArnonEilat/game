import React from 'react';
import './App.css';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Sketch } from './game/Game';
import { SketchBoard } from './game/Board';
import Painter from './components/painter/painter';

const numPlayers = 3;

const GameClient = Client({
  game: Sketch,
  board: SketchBoard,
  numPlayers,
  multiplayer: Local(),
});
const App = () => (
  <div>
    <Painter />
    {[...Array(numPlayers).keys()].map((num) => (
      <GameClient key={`client-${num}`} playerID={`${num}`} />
    ))}
  </div>
);

export default App;
