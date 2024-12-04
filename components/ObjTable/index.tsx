import { useState } from "react";
import classes from "./ObjTable.module.css";


export function ObjTable({ data,config,children}){
    console.debug('ToDoList render');
    return <div className={classes.table}> 
  
        {children}

        <div className={classes.container}>
        <Description data={data}  config={config}/>
        
        </div>

    </div>
}


function Description({data,config,checked}) {
    const [items, setItems] = useState(data);

    const checkbox = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };
    return <div className={classes.items}>
    {data.map(obj => <div key={obj.id} className={classes.item}>
       <ul key={obj.id} data-id={obj.id}>
        {config.columns.map(({title,content})=>
        <li key={title}>
             {content(obj)}
        </li>)}
        <div>
            <input 
             type="checkbox" 
             checked={obj.checked} 
             onChange={() => checkbox(obj.id)}
             data-action={'toggle-checkbox'}/>
            <button data-action={'del'}>X</button>
            {checked && "🙈"}
            </div>
            
    </ul> </div>)}
  </div>
}