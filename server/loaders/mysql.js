import mysql from 'mysql2';

// This creates a pool of mysql connection that support the promis API of ES7
const MysqlPool = mysql.createPool({
  host: 'localhost',
  database: 'task_scheduler_plus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const PromisePool = MysqlPool.promise();

export default PromisePool;
