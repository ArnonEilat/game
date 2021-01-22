import { Guess } from './types';
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

const setDataURL = (G: any, ctx: Ctx, dataURL: string) => {
  G.dataURL = dataURL;
};

const getFreshState = (ctx: Ctx) => {
  const guesses: Array<Guess> = [];
  const dataURL = '';
  return { correctWord: getRandomWord(ctx), guesses, dataURL };
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
        moves: { setDataURL },
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
