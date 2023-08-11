const Logbooks = require("../models/logbooks")
const Logs = require("../models/logs")
const fieldCheck = require("../utils/fieldCheck")

const createLog = async (req, res)=>{
    const logData = req.body
    const email = res.locals.authEmail
    const title = req.params["title"]
    if (fieldCheck(logData)){
        logData["logbook_id"] = title
        logData["user_logbook_id"] = email
        
        await Logs.create(logData).then(results=>{
            res.status(200).json({
                "success": true,
                "message": "log successfully created",
                "log": results
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error creating log",
                "error": error.message
            })
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": "invalid fields detected in request body"
        })
    }
}

module.exports = { createLog }