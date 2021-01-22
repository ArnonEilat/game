import { Ctx } from 'boardgame.io';

export type Guess = {
  guess: string;
  guesser: string;
  correct: boolean;
};

export type Player = {
  score: number;
};

export type GameState = {
  correctWord: string;
  guesses: Array<Guess>;
  winner: string;
  players: {[id: string]: Player};
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
