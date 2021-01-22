import Painter from '../../components/painter/painter';
import React from 'react';
import { GuessList } from '../Board';
import { BoardPropTypes } from '../types';

export const DrawStage = (props: BoardPropTypes) => {
  return (
    <div className='container'>
      <div className='left'>
        <h2>Your turn to draw!</h2>
        <div>Secret word is {props.G.correctWord}</div>
        <GuessList guesses={props.G.guesses} />
      </div>
      <div className='right'>
        <Painter moves={props.moves} />
      </div>
    </div>
  );
};
