const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")
const Users = require("./users")

const Manuals = connection.define("manuals", {
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
	"weeks": {
        "type": DataTypes.NUMBER,
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
    "status": {
        "type": DataTypes.STRING,
    },
    "company_email": {
        "type": DataTypes.STRING,
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
            "model": Users,
            "key": "email"
        },
        "allowNull": false
    }
}, {
    "timestamps": false
})

module.exports = Manuals