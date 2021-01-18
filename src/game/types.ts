export type Guess = {
  guess: string;
  guesser: string;
  correct: boolean;
};

export type Stroke = {
  xBegin: number;
  yBegin: number;
  xEnd: number;
  yEnd: number;
};
