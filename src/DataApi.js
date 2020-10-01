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
    const [repeat, setRepeat] = useState(false);

    useEffect(() => {
      async function fetchData() {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(url);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (error)
        {
          dispatch({ type: 'FETCH_FAILURE' });
        }
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
