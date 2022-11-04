const Pool = require("pg").Pool;
require("dotenv").config();

console.log('env', process.env)

const pool = process.env.NODE_ENV === "production" ?
  new Pool({
    connectionString: process.env.DATABASE_URL, // given by heroku
    ssl: {
      rejectUnauthorized: false,
    },
  })
: new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
  });

console.log('pool', JSON.stringify(pool, null, 2))

module.exports = pool;
