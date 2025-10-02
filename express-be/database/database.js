// database connection config file
// need env variables

import { Sequelize, sequelize } from 'sequelize';

// create sequelize instance with db credentials
const sequelize = new Sequelize(
    'db name',   // db name
    'user name', // user name
    'password',  // password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

export default sequelize;