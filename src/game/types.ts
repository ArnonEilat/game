import { Ctx } from 'boardgame.io';

export type Guess = {
  guess: string;
  guesser: string;
  correct: boolean;
};

export type GameState = {
  correctWord: string;
  guesses: Array<Guess>;
  winner: string;
};

export type Stroke = {
  xBegin: number;
  yBegin: number;
  xEnd: number;
  yEnd: number;
};

export type BoardPropTypes = {
  G: GameState;
  ctx: Ctx;
  playerID: string | null;
  events: any;
  moves: any;
};
