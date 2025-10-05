// Character model for D&D character sheets
import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Character = sequelize.define('Character', {
    // Basic character info
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    // Core stats
    strength: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    dexterity: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    constitution: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    intelligence: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    wisdom: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    charisma: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    
    // Calculated stats
    hitPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 8
    },
    armorClass: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    speed: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    
    // Additional info
    alignment: {
        type: DataTypes.STRING,
        defaultValue: 'True Neutral'
    },
    experiencePoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    
    // User association (for later when we add user authentication)
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true // For now, allow null until we implement user auth
    }
}, {
    timestamps: true
});

export default Character;
