const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")
const Logbooks = require("./logbooks")

const Logs = connection.define("logs", {
    "date": {
        "type": DataTypes.STRING,
        "primaryKey": true,
        "allowNull": false
    },
    "week": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "activity": {
        "type": DataTypes.STRING,
        "allowNull": true
    },
    "logbook_id": {
        "references": {
            "model": Logbooks,
            "key": "title"
        },
        "primaryKey": true,
        "allowNull": false
    },
    "user_logbook_id": {
        "references": {
            "model": Logbooks,
            "key": "user_id",
        },
        "primaryKey": true,
        "allowNull": false
    }
}, {
    "timestamps": false
})

module.exports = Logs