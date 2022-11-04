const Pool = require("pg").Pool;
require("dotenv").config();

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, // given by heroku
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'db',
    port: 5432,
    database: 'db_samehere'
  });
}

console.log('pool', JSON.stringify(pool, null, 2))

module.exports = pool;
