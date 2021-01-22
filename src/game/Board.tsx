import React, { useEffect } from 'react';
import { BoardPropTypes, Guess } from './types';
import './Board.css';
import Painter from '../components/painter/painter';
import { Painted } from '../components/painter/Painted';

const PlayerInput = (props: any) => (
  <input type="text" onKeyPress={props.onKeyPress} />
);

export const GuessList = ({ guesses }: { guesses: Array<Guess> }) => {
  return (
    <ul>
      {guesses.map((guess, i: number) => (
        <li key={`guess${i}`}>{`Player ${guess.guesser} guessed ${
          guess.correct ? 'correctly!' : guess.guess
        }`}</li>
      ))}
    </ul>
  );
};

const DrawStage = (props: BoardPropTypes) => {
  return (
    <div className="container">
      <div className="left">
        <h2>Your turn to draw!</h2>
        <div>Secret word is {props.G.correctWord}</div>
        <GuessList guesses={props.G.guesses} />
      </div>
      <div className="right">
        <Painter moves={props.moves} />
      </div>
    </div>
  );
};

const GuessStage = (props: BoardPropTypes) => {
  return (
    <div className="container">
      <div className="left">
        <h2>Player {props.ctx.currentPlayer} is drawing!</h2>
        <div>
          Type your guess:
          <PlayerInput
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                props.moves.guess(e.target.value);
              }
            }}
          />
        </div>
        <GuessList guesses={props.G.guesses} />
      </div>
      <div className="right">
        <Painted G={props.G} />
      </div>
    </div>
  );
};

export const AnnounceWinnerPhase = (props: BoardPropTypes) => {
  // Only run on mount
  useEffect(() => {
    setTimeout(() => {
      const isCurrentPlayer = props.playerID === props.ctx.currentPlayer;
      if (isCurrentPlayer) {
        props.events?.endTurn!();
      }
    }, 1000);
  }, []);

  return (
    <div>
      <h1>The grand and glorious winner is player {props.G.winner}</h1>
      <h2>1,000,000 points!</h2>
    </div>
  );
};

export const SketchBoard = (props: BoardPropTypes) => {
  const stage = props.ctx?.activePlayers![props.playerID!];

  return (
    <div style={{ height: '250px', border: '2px solid black' }}>
      {stage === 'draw' && <DrawStage {...props} />}
      {stage === 'guess' && <GuessStage {...props} />}
      {stage === 'announceWinner' && <AnnounceWinnerPhase {...props} />}
    </div>
  );
};
