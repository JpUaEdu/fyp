const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres.ipsmzxmbnxnipyoordsl", // your Supabase username
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "postgres", // or your custom db name if it's not "postgres"
  password: "antoinerajeh2003",
  port: 6543,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
