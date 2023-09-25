import React from 'react';
import './Button.css';


function Button({text, handleClick, disabled}) {

  return (
    <button
      className='regular-button'
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;

