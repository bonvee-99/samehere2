const Pool = require("pg").Pool;

const pool = new Pool({
  user: "benjaminvinnick",
  password: "Canucks99**",
  host: "localhost",
  port: 5432,
  database: "samehere2",
});

module.exports = pool;
