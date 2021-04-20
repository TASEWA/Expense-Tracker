const Pool=require("pg").Pool;
//allows to incent this pool and configure it like where and how we are gonna connect to db

const pool=new Pool({
    user: "postgres",
    password:"vector4",
    host: "localhost",
    database: "EXPENSETRACER-TASEWA",
    port:5432
});

//configuring where db is located

module.exports=pool;
//setting this up and to run queries
