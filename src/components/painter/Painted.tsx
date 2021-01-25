import React from 'react';
import { pathMapper } from '../NewPainter/utils';

export const Painted = ({ G }: { G: any }) => {
  const { strokes, stroke } = G;

  let currentLine = null;
  if (stroke?.length > 0) {
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
      {currentLine}
      {strokes && strokes.map(pathMapper)}
    </svg>
  );
};
