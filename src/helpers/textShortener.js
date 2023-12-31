function textShortener( inputString, maxChars ) {
    
    if ( inputString.length > maxChars ) {
        inputString = inputString.substring( 0, maxChars - 1 ) + '...';
    }
    
    return inputString;
}

const word = 'four';
console.log( 'textShortener(word, 3): ', textShortener( word, 3 ) );

export default textShortener;