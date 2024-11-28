import classes from "./ObjTable.module.css";


export function ObjTable({data,config, children}){
    console.debug('ToDoList render');
    return <div className={classes.table}> 
  
        {children}

        <div className={classes.container}>
        <Description data={data} config={config}/>
        </div>
    </div>
}


function Description({data,config}) {
    return  <div className={classes.items}>
    {data.map(obj => <div key={obj.id} className={classes.item}>
       <ul key={obj.id} data-id={obj.id}>
        {config.columns.map(({title,content})=><li key={title}>
            {content(obj)}
          
        </li>)}
        <div>
            <input type="checkbox" data-action={'check'}/>
            <button data-action={'del'}>X</button>
            </div>
    </ul> </div>)}
  </div>
}