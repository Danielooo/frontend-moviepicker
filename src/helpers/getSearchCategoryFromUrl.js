function getSearchCategoryFromUrl( url ) {
    console.log( 'url: ', url );
    console.log( 'url.includes : ', url.includes( 'movie?with_cast=' ) );
    
    if ( url.includes( 'movie?with_cast=' ) ) {
        
        return 'error actor';
        
    } else if ( url.includes( 'movie?with_genres=' ) ) {
        
        return 'genre error';
        
    } else if ( url.includes( 'movie?primary_release_date.gte=' ) ) {
        
        return 'decade error';
        
    } else if ( url.includes( 'movie?query=' ) ) {
        
        return 'title error';
        
    } else {
        
        return 'default error';
        
    }
}

export default getSearchCategoryFromUrl;