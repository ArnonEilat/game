import { faEraser, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styled, { css } from 'styled-components';

const ToolbarWrapper = styled.div`
  display: flex;

  justify-content: space-between;

  width: 50vw;
  box-shadow: rgb(121, 121, 121) 0px 0px 6px 2px;
  margin: 10px 0px 10px 20px;
  padding: 5px;
  border-radius: 5px;
`;
const ToolbarText = styled.div``;

const ToolbarInnerBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ColorsInnerBox = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface ButtonProps {
  isActive: boolean;
}
const Button = styled.button<ButtonProps>`
  ${({ isActive }) => {
    if (isActive) {
      return `background-color: maroon;`;
    }
  }}
`;

interface ColorButtonProps extends ButtonProps {
  color: string;
}

const ColorButton = styled.div<ColorButtonProps>`
  width: 25px;
  height: 25px;
  display: block;
  padding: 0px;
  border: 0px;

  ${({ color }) => {
    return css`
      background-color: ${color};
    `;
  }}
  ${({ isActive }) => {
    if (isActive) {
      return css`
        border: 3px solid #00ff4e;
      `;
    }
    return css`
      border: 3px solid #a0a560;
    `;
  }}
`;

export const Toolbar: React.FC<any> = ({
  handleClear,
  setDrawingMode,
  handleColor,
  handleWidth,
  drawingMode,
  color,
  width,
}) => {
  return (
    <ToolbarWrapper>
      <ToolbarInnerBox>
        <ToolbarText>Brush color</ToolbarText>
        <ColorsInnerBox>
          <ColorButton
            isActive={color === 'red'}
            color={'red'}
            onClick={() => handleColor('red')}
          />
          <ColorButton
            isActive={color === 'blue'}
            color={'blue'}
            onClick={() => handleColor('blue')}
          />
          <ColorButton
            isActive={color === 'black'}
            color={'black'}
            onClick={() => handleColor('black')}
          />
        </ColorsInnerBox>
      </ToolbarInnerBox>
      <ToolbarInnerBox>
        <ToolbarText>Tools</ToolbarText>
        <ToolbarInnerBox>
          <div>
            <Button
              isActive={drawingMode === 'draw'}
              onClick={() => setDrawingMode('draw')}
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </Button>
            <Button
              isActive={drawingMode === 'erase'}
              onClick={() => setDrawingMode('erase')}
            >
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </ToolbarInnerBox>
      </ToolbarInnerBox>

      <ToolbarInnerBox>
        <ToolbarText>Brush size</ToolbarText>

        <input
          type="range"
          min="1"
          max="10"
          step={0.2}
          value={width}
          onChange={(e) => handleWidth((e.target.value as unknown) as number)}
        />
      </ToolbarInnerBox>
      <ToolbarInnerBox>
        <button onClick={handleClear}>Clear</button>
      </ToolbarInnerBox>
    </ToolbarWrapper>
  );
};
