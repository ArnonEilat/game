import React, { Fragment } from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Sketch } from './game/Game';
import { ScreenBoard } from './components/ScreenBoard/ScreenBoard';
import { ControllerBoard } from './components/ControllerBoard/ControllerBoard';
import './App.css';

const numPlayers = 3;

const ControllerClient = Client({
  game: Sketch,
  board: ControllerBoard,
  numPlayers,
  multiplayer: Local(),
});
const ScreenClient = Client({
  game: Sketch,
  board: ScreenBoard,
  numPlayers,
  multiplayer: Local(),
});
const App = () => (
  <Fragment>
    <ScreenClient />
    <div className="space" />
    {[...Array(numPlayers).keys()].map((num) => (
      <div key={`client-${num}`}>
        <ControllerClient playerID={`${num}`} />
        <div className="space" />
      </div>
    ))}
  </Fragment>
);

export default App;
