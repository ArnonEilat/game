export type PainterProps = {
  moves: any;
};

export type PainterState = {
  ptData: Point[];
  session: [Point[]];
};

export type Point = {
  x: number;
  y: number;
};
