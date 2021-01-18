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
const ColorInput = styled.input`
  width: 25px;
  display: block;
  padding: 0px;
  border: 0px;
`;

export const Toolbar: React.FC<any> = ({
  handleDownload,
  dateUrl,
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
        <ColorInput type="color" onChange={handleColor} />
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

      {/*<a download="image.png" onClick={handleDownload} href={dateUrl}>*/}
      {/*  Save Image*/}
      {/*</a>*/}
    </ToolbarWrapper>
  );
};
