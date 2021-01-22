import { Ctx } from 'boardgame.io';

export type Guess = {
  guess: string;
  guesser: string;
  correct: boolean;
};

export type BoardPropTypes = {
  G: {
    correctWord: string;
    guesses: Array<Guess>;
    winner: string;
    dataURL: string;
  };
  ctx: Ctx;
  playerID: string | null;
  events: any;
  moves: any;
};
