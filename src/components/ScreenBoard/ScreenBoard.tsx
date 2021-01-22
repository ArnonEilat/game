import React, { useEffect } from 'react';
import { BoardPropTypes, Guess } from '../../game/types';
import './ScreenBoard.css';
import { Painted } from '../painter/Painted';
import { idText } from 'typescript';
import { ActivePlayers } from 'boardgame.io/dist/types/src/core/turn-order';

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
      const isCurrentPlayer = true;
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

const ScoreBoard = (props: BoardPropTypes) => {
  const scoreBoard = Object.entries(props.G.players)
    .map(([id, player]) => ({ name: id, score: player.score }))
    .sort((a, b) => a.score - b.score);

  return (
    <div>
      <h1>Scores!</h1>
      <table>
        {scoreBoard.map((player) => (
          <tr>
            <td>{`Player ${player.name}`}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export const ScreenBoard = (props: BoardPropTypes) => {
  const stage = Object.values(props.ctx?.activePlayers!).includes('guess')
    ? ScreenStages.Guessing
    : ScreenStages.AnnouncingWinners;

  return (
    <div className="main">
      <div className="main-left">
        {stage === ScreenStages.Guessing && <GuessStage {...props} />}
        {stage === ScreenStages.AnnouncingWinners && (
          <AnnounceWinnerPhase {...props} />
        )}
      </div>
      <div className="main-right">
        <ScoreBoard {...props} />
      </div>
    </div>
  );
};
