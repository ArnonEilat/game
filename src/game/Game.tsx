// import { ActivePlayers } from "boardgame.io/core";
import { Guess } from "./types";

const words = ["pig", "diamond", "butterfly"];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const guess = (G: any, ctx: any, guess: string) => {
  const correct = guess === G.correctWord;
  G.guesses.push({
    guess,
    guesser: ctx.playerID,
    correct,
  });
  if (correct) {
    ctx.events.endStage();
  }
};

export const Sketch = {
  setup: (ctx: any) => {
    ctx.events.setActivePlayers({
      others: "guess",
    });
    const guesses: Array<Guess> = [];
    return { correctWord: getRandomWord(), guesses };
  },

  turn: {
    stages: {
      guess: {
        moves: {
          guess,
        },
      },
    },
  },

  phases: {
    draw: {
      start: true,
      moves: { guess },
      endIf: (G: any) => G.guesses.some((guess: Guess) => guess.correct),
      onEnd: (G: any) => { 
        const winner = G.guesses.find((guess: Guess) => guess.correct).guesser
        G.winner = winner
      }
    },
    announceWinners: {},
  },
};
