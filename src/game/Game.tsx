// import { ActivePlayers } from "boardgame.io/core";
import { Guess } from "./types";
import { Ctx } from "boardgame.io";

const words = ["pig", "diamond", "butterfly"];

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
    ctx.events?.setActivePlayers!({all: 'announceWinner'})
    G.winner = ctx.playerID
  }
};

const getFreshState = (ctx: Ctx) => {
  const guesses: Array<Guess> = [];
  return { correctWord: getRandomWord(ctx), guesses };
};

export const Sketch = {
  setup: (ctx: Ctx) => getFreshState(ctx),

  turn: {
    onBegin: (G: any, ctx: Ctx) => {
      ctx.events?.setActivePlayers!({currentPlayer: 'draw', others: 'guess'})
      return getFreshState(ctx)
    },
    stages: {
      draw: {
        moves: {},
      },
      guess: {
        moves: { guess },
      },
      announceWinner: {
        moves: {},
      }
    },
  },
};
