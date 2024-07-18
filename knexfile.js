// knexfile.js
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: './backend/migrations',
    },
    seeds: {
      directory: './backend/seeds',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './backend/migrations',
    },
    seeds: {
      directory: './backend/seeds',
    }
  }
};
