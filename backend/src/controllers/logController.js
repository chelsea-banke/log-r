const Logbooks = require("../models/logbooks")
const Logs = require("../models/logs")
const fieldCheck = require("../utils/fieldCheck")

const createLog = async (req, res)=>{
    const logData = req.body
    const email = res.locals.authEmail
    const title = res.locals.authTitle
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

const getLogs = async (req, res)=>{
    const email = res.locals.authEmail
    const title = res.locals.authTitle
    await Logs.findAll({"where": {
        "user_logbook_id": email,
        "logbook_id": title
    }}).then(logs=>{
        res.status(200).json({
            "success": true,
            "message": "logs successfully fetched",
            "logs": logs
        })
    }).catch(error=>{
        res.status(401).json({
            "success": false,
            "message": "error fetching logs",
            "error": error.message
        })
    })
}

const updateLog = async (req, res)=>{
    const activity = req.body["activity"]
    const date = (req.params["date"]).split("-").join("/")
    const email = res.locals.authEmail
    const title = res.locals.authTitle

    if(date){
        await Logs.update({"activity": activity}, {"where": {
            "date": date,
            "user_logbook_id": email,
            "logbook_id": title
        }}).then(async results=>{
            await Logs.findAll({"where": {
                "logbook_id": title,
                "user_logbook_id": email
            }}).then(logs=>{
                res.status(200).json({
                    "success": true,
                    "message": "log successfully updated",
                    "logs": logs
                })
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error updating logs",
                "error": error.message
            })
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": "invalid fields detected in request body or parameter"
        })
    }
}

module.exports = { createLog, getLogs, updateLog }