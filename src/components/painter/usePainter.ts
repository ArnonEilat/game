import { useCallback, useRef, useState } from 'react';
import { moveSyntheticComments } from 'typescript';

export const usePainter = (moves: any) => {
  const canvas = useRef<HTMLCanvasElement>();
  const [isReady, setIsReady] = useState(false);
  const [isRegularMode, setIsRegularMode] = useState(true);
  const [isEraser, setIsEraser] = useState(false);

  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentWidth, setCurrentWidth] = useState(5);

  const selectedColor = useRef('#000000');
  const selectedLineWidth = useRef(5);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const isDrawing = useRef(false);
  const isEraserMode = useRef(false);

  const ctx = useRef(canvas?.current?.getContext('2d'));

  const drawOnCanvas = useCallback(
    (event: any) => {
      if (!ctx || !ctx.current) {
        return;
      }

      // Make the move to update the other players
      if (moves.draw) {
        moves.draw({
          xBegin: lastX.current,
          yBegin: lastY.current,
          xEnd: event.offsetX,
          yEnd: event.offsetY,
        });
      }
      ctx.current.beginPath();
      ctx.current.moveTo(lastX.current, lastY.current);
      ctx.current.lineTo(event.offsetX, event.offsetY);
      ctx.current.stroke();
      [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    },
    [moves]
  );

  const handleMouseDown = useCallback((e: any) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const drawNormal = useCallback(
    (e: any) => {
      if (!isDrawing.current || !ctx.current) {
        return;
      }
      ctx.current.strokeStyle = selectedColor.current;

      setCurrentColor(selectedColor.current);

      if (!isEraserMode.current) {
        ctx.current.lineWidth = selectedLineWidth.current;
      }
      if (isEraserMode.current) {
        ctx.current.globalCompositeOperation = 'destination-out';
      } else {
        ctx.current.globalCompositeOperation = 'source-over';
      }
      drawOnCanvas(e);
    },
    [drawOnCanvas]
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', handleMouseDown);
      canvas.current.addEventListener('mousemove', drawNormal);
      canvas.current.addEventListener('mouseup', stopDrawing);
      canvas.current.addEventListener('mouseout', stopDrawing);

      canvas.current.width = 500;
      canvas.current.height = 170;

      ctx.current.strokeStyle = '#000';
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = 5;
      setIsReady(true);
    }
  }, [drawNormal, handleMouseDown, stopDrawing]);

  const handleRegularMode = useCallback(() => {
    setIsRegularMode(true);
    isEraserMode.current = false;
    setIsEraser(false);
  }, []);

  const handleColor = (e: any) => {
    setCurrentColor(e.currentTarget.value);
    selectedColor.current = e.currentTarget.value;
  };

  const handleWidth = (e: any) => {
    setCurrentWidth(e.currentTarget.value);
    selectedLineWidth.current = e.currentTarget.value;
  };

  const handleClear = useCallback(() => {
    if (!ctx || !ctx.current || !canvas || !canvas.current) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const handleEraserMode = (e: any) => {
    setIsRegularMode(true);
    isEraserMode.current = true;
    setIsEraser(true);
  };

  return [
    {
      canvas,
      isReady,
      currentWidth,
      currentColor,
      isRegularMode,
      isEraser,
    },
    {
      init,
      handleRegularMode,
      handleColor,
      handleWidth,
      handleClear,
      handleEraserMode,
    },
  ] as any;
};
