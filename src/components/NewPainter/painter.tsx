import React from 'react';
import simplify from 'simplify-js';
import { PainterProps, PainterState, Point } from './types';
import { pathMapper, toPoint } from './utils';
import cloneDeep from 'lodash.clonedeep';

export default class Painter extends React.Component<
  PainterProps,
  PainterState
> {
  private isMouseDown: boolean;

  constructor(props: PainterProps) {
    super(props);
    this.state = {
      ptData: [],
      session: ([] as unknown) as [Point[]],
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
    const { moves } = this.props;
    this.isMouseDown = false;

    if (ptData.length === 0) {
      return;
    }

    const simplified: Point[] = simplify(ptData, 6);

    const session = cloneDeep(this.state.session);
    session.push(simplified);

    this.setState({ session, ptData: [] }, () => {
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

  updateRealTime = () => this.props.moves.draw(null, this.state.ptData);

  render() {
    const { session, ptData } = this.state;

    let currentLine = null;
    if (ptData.length > 0) {
      currentLine = pathMapper(ptData);
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
        {currentLine}
        {session.map(pathMapper)}
      </svg>
    );
  }
}
