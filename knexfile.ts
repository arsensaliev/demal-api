import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USERNAME || 'postgres',
    port: parseInt(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'demal',
  },
};
