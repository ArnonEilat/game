import React from "react";
import { Guess } from './types'

const PlayerInput = (props: any) => (
  <input type="text" onKeyPress={props.onKeyPress} />
);

export const DrawPhase = (props: any) => {
  const isCurrentPlayer = props.ctx.currentPlayer === props.playerID;

  return (
    <div>
      {isCurrentPlayer ? <h2>Your turn to draw!</h2> : <h2>Player {props.ctx.currentPlayer} is drawing!</h2>}
      {!isCurrentPlayer && (
        <div>
          Type your guess:
          <PlayerInput
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                props.moves.guess(e.target.value);
              }
            }}
          />
        </div>
      )}
      {isCurrentPlayer && <div>Secret word is {props.G.correctWord}</div>}
      <ul>
        {props.G.guesses.map(
          (
            guess: Guess,
            i: number
          ) => (
            <li key={`guess${i}`}>{`Player ${guess.guesser} guessed ${
              guess.correct ? "correctly!" : guess.guess
            }`}</li>
          )
        )}
      </ul>
    </div>
  );
};

export const AnnounceWinnerPhase = (props: any) => (
  <div>
    <h1>The grand and glorious winner is player {props.G.winner}</h1>
  </div>
);

export const SketchBoard = (props: any) => (
  <div style={{ height: "250px", border: "2px solid black" }}>
    {props.ctx.phase === "draw" ? (
      <DrawPhase {...props} />
    ) : (
      <AnnounceWinnerPhase {...props} />
    )}
  </div>
);
