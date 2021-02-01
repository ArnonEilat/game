import React from 'react';
import simplify from 'simplify-js';
import { Line, PainterProps, PainterState, Point } from './types';
import { toPoint } from './utils';
import cloneDeep from 'lodash.clonedeep';
import { LinePath } from './LinePath';

export default class Painter extends React.Component<
  PainterProps,
  PainterState
> {
  private isMouseDown: boolean;

  constructor(props: PainterProps) {
    super(props);
    this.state = {
      ptData: [],
    };

    this.isMouseDown = false;
  }

  onMouseDown = (event: React.MouseEvent) => {
    this.isMouseDown = true;

    const point: Point = toPoint(event);
    const ptData = [point];

    this.setState({ ptData }, this.updateRealTime);
  };

  ignore = () => {
    const { ptData } = this.state;
    const { setLines, lines, currentColor, currentWidth, moves } = this.props;

    this.isMouseDown = false;

    if (ptData.length === 0) {
      return;
    }

    const simplified: Point[] = simplify(ptData, 1);

    const session = cloneDeep(lines);

    const line: Line = {
      points: simplified,
      color: currentColor,
      width: currentWidth,
    };
    session.push(line);

    setLines(session);

    this.setState({ ptData: [] }, () => {
      moves.draw(session, []);
      this.updateRealTime();
    });
  };

  onMouseMove = (event: React.MouseEvent) => {
    if (this.isMouseDown === false) {
      return;
    }
    const point: Point = toPoint(event);
    const ptData = [...this.state.ptData, ...[point]];
    this.setState({ ptData }, this.updateRealTime);
  };

  updateRealTime = () => {
    const { currentColor, currentWidth, moves } = this.props;

    const line: Line = {
      points: this.state.ptData,
      color: currentColor,
      width: currentWidth,
    };

    moves.draw(null, line);
  };

  render() {
    const { ptData } = this.state;
    const { lines, currentColor, currentWidth } = this.props;

    let currentLine = null;
    if (ptData.length > 0) {
      const l: Line = {
        points: ptData,
        color: currentColor,
        width: currentWidth,
      };
      currentLine = <LinePath line={l} />;
    }

    return (
      <svg
        style={{
          display: 'block',
          width: 500,
          height: 400,
          border: '1px solid red',
        }}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.ignore}
        onMouseLeave={this.ignore}
        onMouseMove={this.onMouseMove}
      >
        {lines.map((l: Line, i: number) => (
          <LinePath line={l} key={i} />
        ))}
        {currentLine}
      </svg>
    );
  }
}
