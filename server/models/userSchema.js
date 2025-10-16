import sequelize from '../database/connect.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * USERS
 * Matches: Users(id, username UNIQUE, password_hash, email UNIQUE, timestamps, last_login, is_active, role ENUM, profile_picture_url)
 * Notes:
 * - uses underscored + timestamps to create created_at/updated_at columns automatically
 */
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: { len: [3, 50] }
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.VIRTUAL,    // The password is virtually displayed and is NOT saved inside of the database.
        set(value) { this.setDataValue('password', value ); },
        validate: {
            isLongEnough(value) {
               if (!value || value.length < 8) throw new Error('Password must be at least 8 characters.');
            }
        }
    },
    email: { 
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value ? String(value).toLowerCase().trim() : value);
        },
        validate: {
            isEmail: true
        }
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    /*
    This should be implemented once Characters are implemented. -Raymond

    role: {
        type: DataTypes.ENUM('player', 'dm', 'admin'),
        defaultValue: 'player',
        allowNull: false
    }
        */
}, {
    tableName: 'users',
    timestamps: true,
    underscored: true, // => created_at, updated_at
    hooks: {
        async beforeCreate(user) {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, SALT_ROUNDS);
            }
        },
        async beforeUpdate(user) {
            if (user.changed('password')) {
                user.password_hash = await bcrypt.hash(user.password, SALT_ROUNDS);
            }
        }
    }
});

// Instance methods to verify password
User.prototype.checkPassword = async function(password) {
    const hash = this.getDataValue('password_hash');
    if (!hash) return false;
    return await bcrypt.compare(password, hash);
};

// Ensure's password hash never leaks in JSON
User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password_hash;
    delete values.password;
    return values;
};

export default User;