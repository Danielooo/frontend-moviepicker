import { useEffect, useState } from "react";
import axios from "axios";


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
    },
};

function useFetch( url ) {
    const [ dataFetch, setDataFetch ] = useState( [] );
    const [ errorFetch, setErrorFetch ] = useState( false );
    const [ loadingFetch, setLoadingFetch ] = useState( false );
    
    useEffect( () => {
        if ( !url ) return;
        
        async function fetchData() {
            
            try {
                setLoadingFetch( true );
                const response = await axios.get( url, options );
                setDataFetch( response.data );
            } catch ( e ) {
                setErrorFetch( e );
            } finally {
                setLoadingFetch( false );
            }
        }
        
        void fetchData();
        
    }, [ url ] );
    return { dataFetch, errorFetch, loadingFetch };
}

export default useFetch;

