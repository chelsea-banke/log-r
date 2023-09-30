const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")
const Manuals = require("./manuals")

const Logs = connection.define("logs", {
    "week": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "objectives": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "outcome": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "remarks": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "review": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "status": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "manual_id": {
        "references": {
            "model": Manuals,
            "key": "title"
        },
        "type": DataTypes.STRING,
        "primaryKey": true,
        "allowNull": false
    },
    "manual_user_id": {
        "references": {
            "model": Manuals,
            "key": "user_id",
        },
        "type": DataTypes.STRING,
        "primaryKey": true,
        "allowNull": false
    }
}, {
    "timestamps": false
})

module.exports = Logs