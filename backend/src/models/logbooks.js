const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")
const Users = require("./users")

const Logbooks = connection.define("logbooks", {
    "logbook_id": {
        "type": DataTypes.DECIMAL,
        "primaryKey": true,
        "allowNull": false
    },
	"intern_name": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
	'matricule': {
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
    }
})

Logbooks.belongsTo(Users)

module.exports = Logbooks