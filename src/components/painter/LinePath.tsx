import { Line } from './types';
import React from 'react';
import { toPath } from 'svg-points';

interface LinePathProps {
  line: Line;
}
export const LinePath: React.FC<LinePathProps> = ({ line }) => {
  const d = toPath(line.points);

  return (
    <path
      d={d}
      stroke={line.color}
      strokeWidth={line.width}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      fill="transparent"
    />
  );
};
