export type PainterProps = {
  moves: any;
  currentColor: string;
  currentWidth: number;
  lines: Line[];
  setLines: (lines: Line[]) => void;
};

export type PainterState = {
  ptData: Point[];
};

export type Line = {
  points: Point[];
  color: string;
  width: number;
};

export type Point = {
  x: number;
  y: number;
};
