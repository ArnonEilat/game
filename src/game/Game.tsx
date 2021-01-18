import { Guess, Stroke } from './types';
import { Ctx } from 'boardgame.io';

const words = ['pig', 'diamond', 'butterfly'];

const getRandomWord = (ctx: Ctx) =>
  words[Math.floor(ctx.random!.Number() * words.length)];

const guess = (G: any, ctx: Ctx, guess: string) => {
  const correct = guess === G.correctWord;
  G.guesses.push({
    guess,
    guesser: ctx.playerID,
    correct,
  });
  if (correct) {
    ctx.events?.setActivePlayers!({ all: 'announceWinner' });
    G.winner = ctx.playerID;
  }
};

const draw = (G: any, ctx: Ctx, stroke: Stroke) => {
              console.log('drawing a stroke!', stroke);
  G.strokes.push(stroke);
};

const getFreshState = (ctx: Ctx) => {
  const guesses: Array<Guess> = [];
  const strokes: Array<Stroke> = [];
  return { correctWord: getRandomWord(ctx), guesses, strokes };
};

export const Sketch = {
  setup: (ctx: Ctx) => getFreshState(ctx),

  turn: {
    onBegin: (G: any, ctx: Ctx) => {
      ctx.events?.setActivePlayers!({ currentPlayer: 'draw', others: 'guess' });
      return getFreshState(ctx);
    },
    stages: {
      draw: {
        moves: { draw },
      },
      guess: {
        moves: { guess },
      },
      announceWinner: {
        moves: {},
      },
    },
  },
};
