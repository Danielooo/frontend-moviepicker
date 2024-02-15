// returns a random number within given min max range.
// you can choose to pass the optionalLastNumber
// if passed, the return will be between the range, excluding the optionalLastNumber value

function getRandomInt( min, max, optionalLastNumber ) {
    let randomInt;
    
    if ( optionalLastNumber === undefined ) {
        randomInt = Math.floor( Math.random() * ( max + 1 - min ) + min );
        
    } else {
        do {
            randomInt = Math.floor( Math.random() * ( max + 1 - min ) + min );
        } while ( randomInt === optionalLastNumber );
    }
    
    return randomInt;
}

export default getRandomInt;