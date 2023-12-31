import React from 'react';
import styles from './PopUp.module.css';


function PopUp( { text } ) {
    
    return (
        <div className={styles[ 'popup-container' ]}>
            <p className={styles[ 'popup-container-text' ]}>
                {text ? text : '- Overview not found, please try again -'}
            </p>
        </div>
    );
}

export default PopUp;