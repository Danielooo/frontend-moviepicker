import React from 'react';
import styles from './Button.module.css';


function Button( { type = 'button', text, handleClick, disabled } ) {
    
    
    return (
        <button
            type={type}
            className={styles[ 'regular-button' ]}
            onClick={handleClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;

