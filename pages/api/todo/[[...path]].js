import { neon } from '@neondatabase/serverless'

    const sql = neon(process.env.DATABASE_URL);
    

export default async function todo(req,res){
 const 
    { path} = req.query,
    id = path?.[0];
    console.log("***", { id});
    const rows = await sql`SELECT * FROM todo`; 
    res.status(200).json(
    rows   
    )
}