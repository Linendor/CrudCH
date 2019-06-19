const mysql = require('mysql');
const {promisify} = require ('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.error('LA CONEXION CON LA BASE SE CERRO');
        }
        if(err.code === 'ER_CON_COUNT_ERROR '){
console.error('database has to many connection');

        }
        if(err.code === 'ECONNREFUSED'){
            console.error('conexion rechasada');
        }

    }

    if(connection) connection.release();
    console.log('DB conectada');
});
pool.query = promisify(pool.query);
module.exports = pool;