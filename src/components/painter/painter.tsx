import React, { useEffect } from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { usePainter } from './usePainter';

type PainterProps = {
  moves: {
    setDataURL: Function;
  };
};
const Painter: React.FC<PainterProps> = ({ moves }) => {
  const [{ canvas, ...state }, { init, ...api }] = usePainter(moves);

  useEffect(init, []);
  const toolbarProps = { ...state, ...api };

  return (
    <>
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
    </>
  );
};

export default Painter;
