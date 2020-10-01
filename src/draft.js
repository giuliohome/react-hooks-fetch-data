
      /* poor man string sort 
      {
        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
       }, */


/* poor man html table
     <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>author</th>
          <th>date</th>
          <th>comments</th>
        </tr>
      </thead>
      <tbody>

        {data.hits.map((item, i) => (
          <tr key={item.objectID}> 
            <td>{item.objectID}</td>
            <td><a href={item.url}>{item.title}</a></td>
            <td>{item.author}</td>
            <td>{(new Date(item.created_at)).toLocaleDateString()}</td>
            <td>{item.num_comments}</td>

          </tr>
        ))}

      </tbody>
    </table> */