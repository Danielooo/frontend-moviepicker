import { useEffect, useState } from "react";
import axios from "axios";
import getSearchCategoryFromUrl from './getSearchCategoryFromUrl.js';


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
    },
};

function useFetch( url ) {
    const [ dataFetch, setDataFetch ] = useState( [] );
    const [ errorFetch, setErrorFetch ] = useState( '' );
    const [ loadingFetch, setLoadingFetch ] = useState( false );
    
    
    useEffect( () => {
        setErrorFetch( '' );
        setLoadingFetch( true );
        
        if ( !url ) return;
        
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        async function fetchData() {
            
            try {
                setLoadingFetch( true );
                const response = await axios.get( url, { ...options, signal } );
                setDataFetch( response.data );
            } catch ( e ) {
                setLoadingFetch( false );
                setErrorFetch( getSearchCategoryFromUrl( url ) );
                
                if ( axios.isCancel( e ) ) {
                    console.log( 'Fetch aborted: ', e );
                }
                
            } finally {
                setLoadingFetch( false );
            }
        }
        
        void fetchData();
        
        return () => {
            abortController.abort();
        };
        
    }, [ url ] );
    return { dataFetch, errorFetch, loadingFetch };
}

export default useFetch;

