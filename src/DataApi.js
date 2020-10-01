import {useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import { dataFetchReducer } from './DataApiReducer'


const useDataApi = (initUrl, initData) => {
    
    const [url, setUrl] = useState(initUrl);
    const [state, dispatch] = useReducer(dataFetchReducer(initData), {
      data: initData,
      isLoading: false,
      isError: false,
    });
    //const [data, setData] = useState(initData);
    //const [isLoading, setIsLoading] = useState(false);
    //const [isError, setIsError] = useState(false);
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
      async function fetchData() {
        dispatch({ type: 'FETCH_INIT' });
        //setIsError(false);
        //setIsLoading(true);
        try {
          const result = await axios(url);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          //setData(result.data);
        } catch (error)
        {
          dispatch({ type: 'FETCH_FAILURE' });
          //setIsError(true);
          //setData(initData)
        }
        //setIsLoading(false);
      }
      fetchData();
      return function cleanup() {
        setRepeat(false);
      };
    }, [url, repeat]);

    const fireUrl = newUrl => {
        const before = url;
        setUrl(newUrl);
        if  (url === before)
        {
         setRepeat(true);
        }
    } 

    return [state, fireUrl];
}



export {useDataApi}
