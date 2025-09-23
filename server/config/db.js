import { neon } from "@neondatabase/serverless";

// console.log(process.env.DATABASE_URL)

const sql = neon(`${process.env.DATABASE_URL}`);


export default sql;
