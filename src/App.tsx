import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Client } from 'boardgame.io/react';
import { TicTacToe } from './game/Game';
import { TicTacToeBoard } from './game/Board';

const App = Client({ game: TicTacToe, board: TicTacToeBoard});

export default App;