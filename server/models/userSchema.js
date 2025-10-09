import db from './database/connect.js';
import { DataTypes } from 'sequelize';

/**
 * USERS
 * Matches: Users(id, username UNIQUE, password_hash, email UNIQUE, timestamps, last_login, is_active, role ENUM, profile_picture_url)
 * Notes:
 * - uses underscored + timestamps to create created_at/updated_at columns automatically
 */
const UserSchema = db.sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
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
               if (!value || value.length < 3) throw new Error('Password must be at least 3 characters.');
            }
        }
    },
    email: { type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
    tableName: 'Users',
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

export default UserSchema;