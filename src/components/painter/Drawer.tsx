import React, { Fragment } from 'react';
import { Line, PainterProps } from './types';
import Painter from './Painter';
import { Toolbar } from './Toolbar';

export type DrawerProps = {
  moves: any;
};

type DrawingMode = 'erase' | 'draw';

export type DrawerState = {
  currentColor: string;
  lastColor: string;
  currentWidth: number;
  drawingMode: DrawingMode;
  lines: Line[];
};

export default class Drawer extends React.Component<DrawerProps, DrawerState> {
  constructor(props: PainterProps) {
    super(props);
    this.state = {
      lastColor: 'blue',
      currentColor: 'blue',
      currentWidth: 3,
      drawingMode: 'draw',
      lines: [],
    };
  }

  setDrawingMode = (drawingMode: DrawingMode) => {
    const { currentColor, lastColor } = this.state;
    if (drawingMode === 'draw') {
      this.setState({
        currentColor: lastColor,
        drawingMode,
      });
    } else {
      this.setState({
        lastColor: currentColor,
        currentColor: 'white',
        drawingMode,
      });
    }
  };

  handleClear = () => {
    const { moves } = this.props;
    this.setState({ lines: [] });
    this.setDrawingMode('draw');

    moves.draw([], []);
  };
  render() {
    const { moves } = this.props;
    const { lines, drawingMode, currentColor, currentWidth } = this.state;

    return (
      <Fragment>
        <Toolbar
          color={currentColor}
          width={currentWidth}
          drawingMode={drawingMode}
          setDrawingMode={this.setDrawingMode}
          handleColor={(currentColor: string) =>
            this.setState({ currentColor, drawingMode: 'draw' })
          }
          handleWidth={(currentWidth: number) =>
            this.setState({ currentWidth })
          }
          handleClear={this.handleClear}
        />
        <Painter
          lines={lines}
          setLines={(lines: Line[]) => {
            this.setState({ lines });
          }}
          moves={moves}
          currentColor={currentColor}
          currentWidth={currentWidth}
        />
      </Fragment>
    );
  }
}
