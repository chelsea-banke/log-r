const Manuals = require("../models/manuals")
const Logs = require("../models/logs")
const fieldCheck = require("../utils/fieldCheck")

const createLog = async (req, res)=>{
    const logData = req.body
    const email = res.locals.authEmail
    const title = res.locals.authTitle
    if (fieldCheck(logData)){
        logData["manual_id"] = title
        logData["manual_user_id"] = email
        
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
        "manual_user_id": email,
        "manual_id": title
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
    const email = req.params["email"].slice(1)
    const week = req.params["week"].slice(1)
    const title = req.params["title"].slice(1)

    if(week){
        await Logs.update(req.body, {"where": {
            "week": week.toString(),
            "manual_user_id": email,
            "manual_id": title
        }}).then(async results=>{
            console.log(results)
            await Logs.findAll({"where": {
                "manual_id": title,
                "manual_user_id": email
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
                "error": error
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