import React, { useEffect } from 'react';
import { Guess } from '../../game/types';
import { Ctx } from 'boardgame.io';
import './ControllerBoard.css';
import Drawer from '../painter/Drawer';

type BoardPropTypes = {
  G: {
    correctWord: string;
    guesses: Array<Guess>;
    winner: string;
  };
  ctx: Ctx;
  playerID: string | null;
  events: any;
  moves: any;
};

const PlayerInput = (props: any) => (
  <input type="text" onKeyPress={props.onKeyPress} />
);

const DrawStage = (props: BoardPropTypes) => {
  return (
    <div className="container">
      <div className="left">
        <h2>Your turn to draw!</h2>
        <div>Secret word is {props.G.correctWord}</div>
      </div>
      <div className="right">
        <Drawer moves={props.moves} />
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
      </div>
    </div>
  );
};

export const AnnounceWinnerPhase = (props: BoardPropTypes) => {
  const isWinner = props.playerID === props.G.winner;
  const isCurrentPlayer = props.playerID === props.ctx?.currentPlayer;

  // Only run on mount
  useEffect(() => {
    setTimeout(() => {
      if (isCurrentPlayer) {
        props.events?.endTurn!();
      }
    }, 1500);
  }, []);

  return (
    <div>
      <h1>{isWinner || isCurrentPlayer ? ':)' : ':('}</h1>
    </div>
  );
};

export const ControllerBoard = (props: BoardPropTypes) => {
  const stage = props.ctx?.activePlayers![props.playerID!];

  return (
    <div style={{ height: '350px', border: '2px solid black' }}>
      {stage === 'draw' && <DrawStage {...props} />}
      {stage === 'guess' && <GuessStage {...props} />}
      {stage === 'announceWinner' && <AnnounceWinnerPhase {...props} />}
    </div>
  );
};
