var mysql = require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    port            : 3306,
    user            : 'root',
    password        : 'mysql',
    database        : 'sample2'
});

export default pool;
