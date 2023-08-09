import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

function Button({text, handleClick, disabled}) {
  // const navigate = useNavigate();


  return (
    <button className='regular-button'
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;

