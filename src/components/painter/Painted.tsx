import React from 'react';
import { LinePath } from './LinePath';

import { Line } from './types';

export const Painted = ({ G }: { G: any }) => {
  const { strokes, currentStroke } = G;

  return (
    <svg
      style={{
        display: 'block',
        width: 500,
        height: 400,
        border: '1px solid blue',
      }}
    >
      {strokes &&
        strokes.map((l: Line, i: number) => <LinePath line={l} key={i} />)}

      {currentStroke?.points?.length > 0 && <LinePath line={currentStroke} />}
    </svg>
  );
};
