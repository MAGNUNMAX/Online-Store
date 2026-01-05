import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

["DB_USER", "DB_HOST", "DB_DATABASE", "DB_PASSWORD", "DB_PORT"].forEach((v) => {
  if (!process.env[v]) console.warn(`Variable is not loading ${v}`);
});

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT)
});

export default pool;