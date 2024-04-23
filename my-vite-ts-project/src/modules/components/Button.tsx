import React from 'react';
import { ButtonProps } from './types';

function Button(props:ButtonProps) {
const {text} = props
  return (
    <div>
      <button>{text}</button>
    </div>
  );
}

export default Button;