import { useCallback, useRef, useState } from 'react';

const getOffset = (e: TouchEvent): [number, number] => {
  const target = e?.target as HTMLElement;
  const bcr = target?.getBoundingClientRect() as DOMRect;
  const offsetX = e.targetTouches[0].clientX - bcr.x;
  const offsetY = e.targetTouches[0].clientY - bcr.y;

  return [offsetX, offsetY];
};

type PainterMode = 'Eraser' | 'Regular';

export const usePainter = (moves: any) => {
  const canvas = useRef<HTMLCanvasElement>();

  const [mode, setMode] = useState<PainterMode>('Regular');
  const drawingMode = useRef<PainterMode>('Regular');

  const [currentColor, setCurrentColor] = useState<string>('#000000');
  const selectedColor = useRef<string>('#000000');

  const [currentWidth, setCurrentWidth] = useState<number>(5);
  const selectedLineWidth = useRef<number>(5);

  const lastX = useRef<number>(0);
  const lastY = useRef<number>(0);

  const ctx = useRef((canvas?.current as HTMLCanvasElement)?.getContext('2d'));

  const handleMouseDown = useCallback((e: TouchEvent) => {
    const [offsetX, offsetY] = getOffset(e);
    [lastX.current, lastY.current] = [offsetX, offsetY];
  }, []);

  const drawNormal = useCallback((event: TouchEvent) => {
    const context = ctx?.current;
    if (!context) {
      return;
    }
    // abort drag
    event.preventDefault();

    context.strokeStyle = selectedColor.current;
    context.lineWidth = selectedLineWidth.current;

    if (drawingMode.current === 'Eraser') {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
    }

    const [offsetX, offsetY] = getOffset(event);
    context.beginPath();
    context.moveTo(lastX.current, lastY.current);
    context.lineTo(offsetX, offsetY);
    context.stroke();

    [lastX.current, lastY.current] = [offsetX, offsetY];
  }, []);

  const stopDrawing = useCallback(() => {
    const dataURL = canvas?.current?.toDataURL('image/png') as string;
    moves.setDataURL(dataURL);
  }, []);

  const init = useCallback(() => {
    const canvasElement = canvas.current as HTMLCanvasElement;
    ctx.current = canvasElement?.getContext('2d') as CanvasRenderingContext2D;

    if (canvas?.current && ctx?.current) {
      canvasElement?.addEventListener('touchstart', handleMouseDown);
      canvasElement?.addEventListener('touchmove', drawNormal);
      canvasElement?.addEventListener('touchend', stopDrawing);
      canvasElement?.addEventListener('touchcancel', stopDrawing);

      canvasElement.width = 500;
      canvasElement.height = 170;

      ctx.current.strokeStyle = '#000';
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = 5;
    }

    return () => {
      canvasElement?.removeEventListener('touchstart', handleMouseDown);
      canvasElement?.removeEventListener('touchmove', drawNormal);
      canvasElement?.removeEventListener('touchend', stopDrawing);
      canvasElement?.removeEventListener('touchcancel', stopDrawing);
    };
  }, []);

  const handleColor = (color: string) => {
    setCurrentColor(color);
    selectedColor.current = color;
  };

  const handleWidth = (e: any) => {
    setCurrentWidth(e.currentTarget.value);
    selectedLineWidth.current = e.currentTarget.value;
  };

  const handleClear = useCallback(() => {
    if (!ctx?.current || !canvas?.current) {
      return;
    }
    const canvasElement = canvas.current as HTMLCanvasElement;

    ctx.current.clearRect(
      0,
      0,
      canvasElement?.width as number,
      canvasElement?.height as number
    );

    stopDrawing();
  }, []);

  const handleEraserMode = () => {
    drawingMode.current = 'Eraser';
    setMode('Eraser');
  };
  const handleRegularMode = () => {
    drawingMode.current = 'Regular';
    setMode('Regular');
  };

  return [
    {
      canvas,
      currentWidth,
      currentColor,
      isRegularMode: drawingMode.current === 'Regular',
      isEraser: drawingMode.current === 'Eraser',
    },
    {
      init,
      handleRegularMode,
      handleEraserMode,
      handleColor,
      handleWidth,
      handleClear,
    },
  ] as any;
};
