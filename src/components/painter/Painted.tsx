import React, { useEffect, useRef } from 'react';

export const Painted = ({ G }: { G: any }) => {
  const canvasRef: any = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef?.current as HTMLCanvasElement;
    const context = canvasElement.getContext!('2d') as CanvasRenderingContext2D;
    canvasElement.width = 500;
    canvasElement.height = 170;

    const img = new Image();
    img.onload = () => context.drawImage(img, 0, 0);
    img.src = G.dataURL;
  }, [G]);

  return (
    <canvas style={{ boxShadow: '0px 0px 6px 2px #797979' }} ref={canvasRef} />
  );
};
