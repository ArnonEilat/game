import { ActivePlayers } from 'boardgame.io/core';

const words = ['pig', 'diamond', 'butterfly']

const getRandomWord = () => words[Math.floor(Math.random() * words.length)]

export const TicTacToe = {
    setup: () => ({ correctWord: getRandomWord(), guesses: [] }),
    
    moves: {
      guess: (G: any, ctx: any, guess: string) => {
        const correct = guess === G.correctWord
        G.guesses.push({
          guess,
          guesser: ctx.playerID,
          correct
        })
      },
    },

    turn: {
      activePlayers: ActivePlayers.OTHERS
    }
  };