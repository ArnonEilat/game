import React, { useEffect } from 'react';
import { BoardPropTypes, Guess } from '../../game/types';
import './ScreenBoard.css';
import { Painted } from '../painter/Painted';

enum ScreenStages {
  Guessing,
  AnnouncingWinners,
}

const GuessList = ({ guesses }: { guesses: Array<Guess> }) => {
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

const GuessStage = (props: BoardPropTypes) => {
  return (
    <div className="container">
      <div className="left">
        <Painted G={props.G} />
      </div>
      <div className="right">
        <h1>Guesses so far</h1>
        <GuessList guesses={props.G.guesses} />
      </div>
    </div>
  );
};

export const AnnounceWinnerPhase = (props: BoardPropTypes) => {
  // Only run on mount
  useEffect(() => {
    setTimeout(() => {
      const isCurrentPlayer = true
      if (isCurrentPlayer) {
        props.events?.endTurn!();
      }
    }, 3500);
  }, []);

  return (
    <div>
      <h1>The grand and glorious winner is player {props.G.winner}</h1>
      <h2>1,000,000 points!</h2>
    </div>
  );
};

export const ScreenBoard = (props: BoardPropTypes) => {
  const stage = Object.values(props.ctx?.activePlayers!).includes('guess') ? ScreenStages.Guessing : ScreenStages.AnnouncingWinners

  return (
    <div className="main">
      {stage === ScreenStages.Guessing && <GuessStage {...props} />}
      {stage === ScreenStages.AnnouncingWinners && <AnnounceWinnerPhase {...props} />}
    </div>
  );
};
