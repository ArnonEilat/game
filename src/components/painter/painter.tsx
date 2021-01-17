import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { usePainter } from './usePainter';

const Painter = () => {
  const [dateUrl, setDataUrl] = useState('#');
  const [{ canvas, isReady, ...state }, { init, ...api }] = usePainter();

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) {
      return;
    }

    setDataUrl(canvas.current.toDataURL('image/png'));
  }, [canvas]);

  useEffect(init, []);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload };

  return (
    <>
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
    </>
  );
};

export default Painter;
