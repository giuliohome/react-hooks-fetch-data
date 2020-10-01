import React from 'react';
import {useDataApi} from './DataApi.js'

const columnsAlgolia = [
    {
      name: 'Id',
      selector: 'objectID',
      sortable: true,
      right: true,
    },
    {
      name: 'Title',
      cell: item => <a href={item.url}>{item.title}</a>,
      selector: 'title', // it is needed for sortFunction!
      sortable: true,
      sortFunction: (a, b) => a.title.localeCompare(b.title),

    },
    {
      name: 'Author',
      selector: 'author',
      sortable: true,
      sortFunction: (a, b) => {
        if(a.author.toLowerCase() < b.author.toLowerCase()) return -1;
        if(a.author.toLowerCase() > b.author.toLowerCase()) return 1;
        return 0;
       },
    },
    {
      name: 'Date',
      selector: item => (new Date(item.created_at)).toLocaleDateString(),
      sortable: true,
      sortFunction: (rowA, rowB) =>  (new Date(rowA.created_at)) - (new Date(rowB.created_at)),
    },
    {
      name: 'Comments',
      selector: 'num_comments',
      sortable: true,
      right: true,
    },
  ];
  
  function algoliaUrl(query) {
    return `https://hn.algolia.com/api/v1/search?query=${query}`
  }

 
const initData = { hits: [] }

const useAngoliaApi = initQuery => {
    
    let [state, fireUrl] = useDataApi(algoliaUrl(initQuery), initData);

    const setAngoliaQuery = query => {
        fireUrl(algoliaUrl(query))
    } 

    return [columnsAlgolia, state.data, state.isError, state.isLoading, setAngoliaQuery];
}



export {useAngoliaApi}
