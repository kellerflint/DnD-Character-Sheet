import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config({
    path: './.env'
});

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE, DB_PORT } = process.env;

const sequelize = new Sequelize(
    DB_DATABASE, DB_USER, DB_PASS, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: query => console.log(`SQL Query: ${query}`)
    }
);

try {
    await sequelize.authenticate();
    console.log("Connected successfully.")
} catch (err) {
    console.error("Unable to connect to the database:", err);
}

export default sequelize;