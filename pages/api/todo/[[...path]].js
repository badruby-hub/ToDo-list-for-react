import { neon } from '@neondatabase/serverless'

    const sql = neon(process.env.DATABASE_URL);
    
export default async function todo(req,res){
 const 
    { path} = req.query,
    id = path?.[0];
    console.log("***", { id});



                  switch (req.method) {
                    case 'OPTIONS':
                        res.writeHead(204);
                        break;
                    case 'GET':
                        const getAllSt = await sql`SELECT * FROM todo`;
                        res.status(200).json(getAllSt)
                      break;
                    case 'POST':
                        const postData = req.body;
                      const addSt = await sql`INSERT INTO todo (id,text,checked) values(${postData.id},${postData.text}, 0) `;
                      console.log(`addSt ${postData.check}`);
                      res.status(201).end()
                      break;
                    case 'DELETE':
                           const deleteSt = await sql`DELETE from todo where id = ${id} `;
                           console.log("delete=",id);
                           res.status(201).end()
                      break;
                    case 'PATCH':
                        const patchData = req.body;
                        const checkedValue = patchData.checked ? 1 : 0; 
                        const check = await sql`UPDATE todo set checked=${checkedValue} where id= ${id}`;
                         console.log("id=",id,'integer =',checkedValue )
                          res.status(204).end();
                      break;
                      default:
                        res.statusCode = 404;
                  }
   
}

