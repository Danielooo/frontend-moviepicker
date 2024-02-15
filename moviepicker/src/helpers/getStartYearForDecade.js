// Options for dropdown in MovieSearch
function getStartYearForDecade( selectedDecade, currentYear ) {
    switch ( selectedDecade ) {
        case '2020s':
            return 2020;
        case '2010s':
            return 2010;
        case '2000s':
            return 2000;
        case '1990s':
            return 1990;
        case '1980s':
            return 1980;
        case '1970s':
            return 1970;
        case '1960s':
            return 1960;
        case '1950s':
            return 1950;
        case '1940s':
            return 1940;
        case '1930s':
            return 1930;
        case '1920s':
            return 1920;
        case '1910s':
            return 1910;
        case '1900s':
            return 1900;
        // Add more cases if needed
        default:
            return currentYear;
    }
}

export default getStartYearForDecade;