import React from 'react';
import { Point } from './types';

/**
 * convert event to point
 */
export const toPoint = (event: React.MouseEvent): Point => {
  const { nativeEvent } = event;

  const x: number = nativeEvent.offsetX;
  const y: number = nativeEvent.offsetY;

  return { x, y };
};
