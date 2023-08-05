const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")
const Users = require("./users")

const Logbooks = connection.define("logbooks", {
	"intern_name": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"matricule": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"department": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"level": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"start_date": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"stop_date": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"company_name": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"address": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	"phone": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "title": {
        "primaryKey": true,
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "user_id": {
        "primaryKey": true,
        "type": DataTypes.STRING,
        "references": {
            "model": "Users",
            "key": "email"
        },
        "allowNull": false
    }
}, {
    timestamps: false
})

module.exports = Logbooks