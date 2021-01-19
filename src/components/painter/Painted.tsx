import React, { useRef, useEffect } from 'react';
import { Stroke } from '../../game/types';

export const Painted = ({ G }: { G: any }) => {
  const canvasRef: any = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current
    canvas.width  = 500;
    canvas.height = 400;
  })
  useEffect(() => {
    const context = canvasRef?.current?.getContext!('2d');
    //Our first draw
    context.fillStyle = 'white';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    const draw = (strokes: Array<Stroke>) => {
      if (!context) {
        return;
      }
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = '#000000';

      for (const stroke of strokes) {
        context.beginPath();
        context.moveTo(stroke.xBegin, stroke.yBegin);
        context.lineTo(stroke.xEnd, stroke.yEnd);
        context.stroke();
      }
    };

    draw(G.strokes);
  }, [G]);

  return <canvas style={{ border: '2px solid black' }} ref={canvasRef} />;
};
