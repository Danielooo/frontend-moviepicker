import styles from './InfoButton.module.css';


function InfoButton( { text, id } ) {
    
    const sentences = text.split( '\n' ).map( ( sentence, index ) => (
        <p key={index}>{sentence}</p>
    ) );
    
    
    return (
        <>
            <div className={styles[ 'infobutton-container' ]}>
                <span className={styles[ 'infobutton-circle' ]}>i</span>
                <div className={styles[ 'explain-popup' ]}>
                    {sentences}
                </div>
            </div>
        </>
    );
}

export default InfoButton;


