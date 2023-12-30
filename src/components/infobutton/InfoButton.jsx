import React, { useId } from 'react';
import './InfoButton.css';


function InfoButton( { text, id } ) {
    const idPrefix = useId();
    
    const sentences = text.split( '\n' ).map( ( sentence, index ) => (
        <p key={`${idPrefix}-${index}`}>{sentence}</p>
    ) );
    
    
    return (
        <>
            <div className='infobutton-container'>
                <span className='infobutton-circle'>i</span>
                <div className='explain-popup'>
                    {sentences}
                </div>
            </div>
        </>
    );
}

export default InfoButton;


