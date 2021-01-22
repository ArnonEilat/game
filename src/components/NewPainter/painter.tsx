import React from 'react';
import simplify from 'simplify-js';
import { PainterProps, PainterState, Point } from './types';
import { pathMapper, toPoint } from './utils';

export default class Painter extends React.Component<
  PainterProps,
  PainterState
> {
  private isMouseDown: boolean;

  constructor(props: PainterProps) {
    super(props);
    this.state = {
      ptData: [],
      session: [[]],
    };

    this.isMouseDown = false;
  }

  onMouseDown = (event: React.MouseEvent) => {
    this.isMouseDown = true;

    const point: Point = toPoint(event);
    const ptData = [point];

    this.setState({ ptData });
  };

  ignore = () => {
    const { session, ptData } = this.state;
    this.isMouseDown = false;

    if (ptData.length === 0) {
      return;
    }

    const simplified: Point[] = simplify(ptData, 2);

    session.push(simplified);
    this.setState({ session, ptData: [] });
  };

  onMouseMove = (event: React.MouseEvent) => {
    if (this.isMouseDown === false) {
      return;
    }
    const point: Point = toPoint(event);
    const ptData = [...this.state.ptData, ...[point]];
    this.setState({ ptData });
  };

  render() {
    const { session, ptData } = this.state;

    let currentLine = null;
    if (ptData.length > 0) {
      currentLine = pathMapper(ptData);
    }

    return (
      <svg
        style={{ width: 500, height: 500, border: '1px solid red' }}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.ignore}
        onMouseLeave={this.ignore}
        onMouseMove={this.onMouseMove}
      >
        {currentLine}
        {session.map(pathMapper)}
      </svg>
    );
  }
}
