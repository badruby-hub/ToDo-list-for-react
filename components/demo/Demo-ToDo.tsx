import { ObjTable } from "@/components/ObjTable";
import { config } from "../configs/ArrayTitle";
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Error } from '../Error/index';
import { useState } from "react";
import classes from "./Demo-ToDo.module.css"
const 
API_URL = 'http://localhost:3001/users',
DELETE = 'del',
CHECK = 'check',
ADD ='add',
fetcher = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
},
infofetcher = async()=>{
    const pr = fetcher()
    toast.promise(pr,{
        loading:'Fetcher',
        success:'ok',
        error: (err) => `${err.toString()}`,
    });
    return await pr
},
columns = config.columns;

function AddForm({columns,values,setValues}) {

    return <div className={classes.form}>
         {columns.map(({setVal},i)=> <div key={i}>
            {setVal
                ? <input
                  value={values[i]}
                  onInput={event =>setValues(prev=>prev.with(i,event.target.value))}/>
                : ''}
                </div>
         )}
        <div>
            <button data-action={ADD}>Добавить</button>
            <button data-action='cancel'onClick={()=>setValues(Array.from({length: columns.length},()=>''))}>Сброс</button>

        </div>
    </div>
}

export  function DemoToDo(){
    const 
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher,{revalidateOnFocus:false}),
    [addValues,setAddValues]= useState(Array.from({length: config.columns.length},()=>'')),
    onClick =async event =>{
        const 
           action = event.target.closest('[data-action]')?.dataset?.action,
           id = +event.target.closest('[data-id]')?.dataset?.id;
           console.log("onClick", {action,id});
           if(!action)return;
           let optimisticData;
           const 
              getPromise=()=>{
                    switch (action) {
                        case DELETE:
                            if(!id)return;
                            optimisticData = data.filter(el => String(el.id) !== id);
                            return fetch(API_URL + '/' + id, { method: 'DELETE' })
                              .then(res => {
                                if (!res.ok) {
                                  throw (new Error(res.status + ' ' + res.statusText));
                              }
                             });
                        case ADD:
                            const newObj = {};
                            config.columns.map(({setVal},i)=>setVal && Object.assign(newObj,setVal(addValues[i])));
                        const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
                        newObj.id = (maxId + 1).toString(); 
                            optimisticData = data.concat(newObj);
                            return fetch(API_URL, {
                                 method: 'POST',
                                  headers:{'Content-Type': 'application/json'},
                                  body: JSON.stringify(newObj)
                             }).then(res => {
                              if (!res.ok) {
                                throw (new Error(res.status + ' ' + res.statusText));
                              }
                              setAddValues(Array.from({ length: config.columns.length }, () => ''));
                          });
                        }
                    },
              promise = getPromise();

           if(promise){
            toast.promise(promise,{
                loading:'Fetching' + action,
                success:'ok',
                error: (err) => `${err.toString()}`,
            });
            await mutate(promise.then( ()=> optimisticData, fetcher), {optimisticData, revalidate:true});
           }
    };
    return <>
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
    </div>
    {error && <Error error={error} />}
         <div onClick={onClick}>
        {data && <ObjTable data={data} config={{columns}}>
            
            <AddForm columns={config.columns} values={addValues} setValues={setAddValues}/>
                 </ObjTable>
            }
        </div>

    </>
}

