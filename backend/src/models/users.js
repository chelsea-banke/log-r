const { DataTypes } = require("sequelize")
const pool = require("../utils/pool")

const Users = pool.define('users', {
        "email": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "primaryKey": true
        },
        "first_name": {
            "type": DataTypes.STRING,
            "allowNull": false,
        },
        "last_name": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false
        }
    }, {
        timestamps: false
    }
)

module.exports = Users