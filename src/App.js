import React, { useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import './App.css';
import {useAngoliaApi} from './AlgoliaDef.js'

function App() {  
  const initQuery = 'redux'
  let [columnsAlgolia, data, isError, isLoading, setAngoliaQuery] = useAngoliaApi(initQuery);
  const [query, setQuery] = useState(initQuery);


  return (
    <Fragment>
      <form onSubmit={event => {
        setAngoliaQuery(query);
        event.preventDefault();
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
        ) : (
        <DataTable
            title="Algolia Articles"
            columns={columnsAlgolia}
            data={data.hits}
          />
        )
      }
    </Fragment>
  );
}

export default App;
