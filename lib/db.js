import mysql from "mysql2";


  // Create the connection pool. The pool-specific settings are the defaults
  const dbPool = mysql.createPool({
    host: "185.28.21.1",
    user: "u162410258_yahyaj",
    password: "lion567YJ10",
    database: "u162410258_techify",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

export default dbPool;