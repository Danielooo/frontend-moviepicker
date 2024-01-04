function textShortener( inputString, maxChars ) {
    
    if ( inputString.length > maxChars ) {
        inputString = inputString.substring( 0, maxChars - 1 ) + '...';
    }
    
    return inputString;
}

export default textShortener;