// database table for user login credentials

import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

// define user model which will map users to table in db
const User = sequelize.define('User', {
    // table columns
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    timestamps: true
});

export default User;