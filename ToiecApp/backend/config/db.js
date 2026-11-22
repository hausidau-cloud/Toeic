const sql = require("mssql");

const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "ToeicDB",

  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

const pool = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("SQL Server Connected");
    return pool;
  })
  .catch((err) => {
    console.log("Database Error:", err);
  });

module.exports = {
  sql,
  pool,
};
