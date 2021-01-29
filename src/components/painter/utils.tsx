import React from 'react';
import { toPath } from 'svg-points';
import { Line, Point } from './types';

/**
 * convert event to point
 */
export const toPoint = (event: React.MouseEvent): Point => {
  const { nativeEvent } = event;

  const x: number = nativeEvent.offsetX;
  const y: number = nativeEvent.offsetY;

  return { x, y };
};

export const pathMapper = (line: Line, index?: number) => {
  const d = toPath(line.points);
  const key = Number.isInteger(index) ? { key: index } : {};
  return (
    <path
      d={d}
      {...key}
      stroke={line.color}
      strokeWidth={line.width}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      fill="transparent"
    />
  );
};
