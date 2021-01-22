import { faEraser, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styled from 'styled-components';

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

type ButtonProps = {
  isActive: boolean;
};
const Button = styled.button<ButtonProps>`
  ${({ isActive }) => {
    if (isActive) {
      return `  background-color: maroon;`;
    }
  }}
`;

type ColorButtonProps = {
  color: string;
};
const ColorButton = styled.div<ColorButtonProps>`
  width: 25px;
  height: 25px;
  ${({ color }) => `background-color: ${color};`};
`;

export const Toolbar: React.FC<any> = ({
  handleClear,
  handleEraserMode,
  handleRegularMode,
  handleColor,
  handleWidth,
  isRegularMode,
  isEraser,
}) => {
  return (
    <ToolbarWrapper>
      <ToolbarInnerBox>
        <ToolbarText>Brush color</ToolbarText>
        <ColorButton color={'#000000'} onClick={() => handleColor('#000000')} />
        <ColorButton color={'#ff0057'} onClick={() => handleColor('#ff0057')} />
      </ToolbarInnerBox>
      <ToolbarInnerBox>
        <ToolbarText>Tools</ToolbarText>
        <ToolbarInnerBox>
          <div>
            <Button
              isActive={isRegularMode && !isEraser}
              onClick={handleRegularMode}
            >
              <FontAwesomeIcon icon={faPaintBrush} />
            </Button>

            <Button isActive={isEraser} onClick={handleEraserMode}>
              <FontAwesomeIcon icon={faEraser} />
            </Button>
          </div>
        </ToolbarInnerBox>
      </ToolbarInnerBox>

      <ToolbarInnerBox>
        <ToolbarText>Brush size</ToolbarText>

        <input
          defaultValue="5"
          type="range"
          min="10"
          max="90"
          onChange={handleWidth}
        />
      </ToolbarInnerBox>
      <ToolbarInnerBox>
        <button onClick={handleClear}>Clear</button>
      </ToolbarInnerBox>
    </ToolbarWrapper>
  );
};
