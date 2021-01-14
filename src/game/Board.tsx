import React from "react";

const TicTacToeBoard = (props: any) => (
  <div>
    <h1>Player {props.ctx.currentPlayer} is drawing!</h1>
    <ul>
      {props.G.guesses.map(
        (guess: { guess: string; guesser: string; correct: boolean }, i: number) => (
          <li
            key={`guess${i}`}
          >{`Player ${guess.guesser} guessed ${guess.correct ? 'correctly!' : guess.guess}`}</li>
        )
      )}
    </ul>
  </div>
);

export { TicTacToeBoard };
