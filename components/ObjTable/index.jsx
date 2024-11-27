import  classes  from "./ObjTable.module.css";


export function ObjTable({data,config}){
    console.debug('ToDoList render');
    return <table className={classes.table}> 
        <thead>
            <tr>
                {config.columns.map(({title}) =><td key={title}>{title}</td>)}
            </tr>
        </thead>
      <tbody>
        {data.map(obj => <tr key={obj.id}>
            {config.columns.map(({title,content})=> <td key={title}>
                {content(obj)}
            </td>)}
        </tr>)}
      </tbody>
    </table>
}