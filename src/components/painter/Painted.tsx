import React from 'react';
import { pathMapper } from './utils';

export const Painted = ({ G }: { G: any }) => {
  const { strokes, stroke } = G;

  let currentLine = null;
  if (stroke?.points?.length > 0) {
    currentLine = pathMapper(stroke);
  }

  return (
    <svg
      style={{
        display: 'block',
        width: 500,
        height: 400,
        border: '1px solid blue',
      }}
    >
      {strokes && strokes.map(pathMapper)}
      {currentLine}
    </svg>
  );
};
