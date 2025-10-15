// Database connection config file

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load .env file
dotenv.config({ path: "./.env" });
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT || !DB_PORT) {
    throw new Error("Please make sure you have a .env file with db credentials");
}

// MySQL database configuration - initializing Sequelize to connect to a MySQL database
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT
    }
)

export default sequelize;