// import { Fetcher } from "@/components/Fetcher";
import { ObjTable } from "@/components/ObjTable";
import { config } from "../configs/ArrayTitle";
// import { useCallback, useState } from "react";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Error } from '../Error/index';

const 
API_URL = 'http://localhost:3001/users',
fetcher = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
};

export  function DemoToDo(){
    const 
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher);
    return <>
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
    </div>
    {error && <Error error={error} />}
    {data && <ObjTable data={data} config={config}/>}
    </>
}

// const
//    rand = Math.random();
// export  function DemoToDo(){
//     const 
//       [users,setUsers] = useState(null),
//       onload = useCallback(data => setUsers(data));
//       console.debug('Demo render');
// return<>
// <button onClick={()=>toast('test')}>ok</button>
// <Fetcher 
//  url={'http://localhost:3001/users?' + rand}
//  onload={onload}>
//    <ObjTable data={users} config={config}/>
// </Fetcher>

// </>
// }