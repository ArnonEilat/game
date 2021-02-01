import { Guess, Stroke, GameState } from './types';
import { Ctx } from 'boardgame.io';
import { words } from '../assets/words';

const getRandomWord = (ctx: Ctx) =>
  words[Math.floor(ctx.random!.Number() * words.length)];

const guess = (G: GameState, ctx: Ctx, guess: string) => {
  const correct = guess.toLowerCase() === G.correctWord.toLowerCase();
  G.guesses.push({
    guess,
    guesser: ctx.playerID!,
    correct,
  });
  if (correct) {
    ctx.events?.setActivePlayers!({ all: 'announceWinner' });
    G.winner = ctx.playerID!;
    G.players[ctx.playerID!].score += 5;
  }
};

const draw = (G: any, ctx: Ctx, strokes: Stroke, currentStroke: Stroke) => {
  if (strokes) {
    G.strokes = strokes;
  }
  G.currentStroke = currentStroke;
};

const getFreshState = (ctx: Ctx) => {
  const guesses: Array<Guess> = [];
  const strokes: Array<Stroke> = [];
  return {
    correctWord: getRandomWord(ctx),
    guesses,
    strokes,
    currentStroke: [],
  };
};

const getPlayers = (ctx: Ctx) =>
  Object.fromEntries(
    [...Array(ctx.numPlayers).keys()].map((num) => [`${num}`, { score: 0 }])
  );

export const Sketch = {
  setup: (ctx: Ctx) => ({ ...getFreshState(ctx), players: getPlayers(ctx) }),

  turn: {
    onBegin: (G: any, ctx: Ctx) => {
      ctx.events?.setActivePlayers!({ currentPlayer: 'draw', others: 'guess' });
      return { ...G, ...getFreshState(ctx) };
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
