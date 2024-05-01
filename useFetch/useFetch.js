import React, { useEffect, useState } from 'react'


const localCache = {};



export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {
      
        getFetch();
    
    }, [url]);


    //Inicializar todo
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    }


    const getFetch = async () => {

        //PREGUNTA SI ESTA EN CACHE
        if (localCache[url]) {
            console.log('Using cache');
            
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });

            console.log(localCache[url]);

            return;
        }

        
        setLoadingState();
        
        const resp = await fetch(url);
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return;
        }

        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        });


        //ALMACENAR EN CACHE

        localCache[url] = data;
        

    }
    


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}

