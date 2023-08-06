const e = require("express")
const Logbooks = require("../models/logbooks")
const fieldCheck = require("../utils/fieldCheck")

const createLogbook = async (req, res)=>{
    const email = res.locals.authEmail
    const logbookData = req.body
    if(fieldCheck(logbookData)){
        await Logbooks.findAll({"where":{
            "title": logbookData["title"],
            "user_id": email
        }
        }).then(async logbooks=>{
            const logbook = logbooks[0]
            if(logbook){
                res.status(400).json({
                    "success": false,
                    "message": `logbook with title ${logbookData["title"]} already exist`
                })
            }
            else{
                logbookData["user_id"] = email
                await Logbooks.create(logbookData).then(results=>{
                    res.status(200).json({
                        "success": true,
                        "message": "successfull fetch of logbook",
                        "logbook": results
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error creating logbook",
                        "error": error.message
                    })
                })
            }
        })
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "Bad request",
            "data": credentials
        })
    }
}

const getLogbook = async (req, res)=>{
    const email = res.locals.authEmail
    const title = req.params["title"].slice(1)
    if(title){
        await Logbooks.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(logbooks=>{
            const logbook = logbooks[0]
            if(logbook){
                res.status(200).json({
                    "success": true,
                    "message": "logbook fetch successfull",
                    "logbook": logbook
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no logbook titled ${title}`,
                })
            }
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching logbook",
                "error": error.message
            })
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": `${title} title parameter`
        })
    }
}

const updateLogbook = async (req, res)=>{
    const email = res.locals.authEmail
    const title = req.params["title"].slice(1)
    const logbookData = req.body
    if(fieldCheck(logbookData)){
        await Logbooks.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(async logbooks=>{
            if(logbooks[0]){
                await Logbooks.update(logbookData, {"where": {
                    "user_id": email,
                    "title": title
                }}).then(results=>{
                    res.status(200).json({
                        "success": true,
                        "message": "logbook successfully updated",
                        "logbook": logbookData
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error updating logbook",
                        "error": error.message
                    })
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no logbook titled ${title}`,
                })
            }
        })
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "Bad request: invalid fields detected"
        })
    }
}

const deleteLogbook = async (req, res)=>{
    const email = res.locals.authEmail
    const title = req.params["title"].slice(1)
    if(title){
        await Logbooks.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(async logbooks=>{
            if(logbooks[0]){
                await Logbooks.destroy({"where": {
                    "user_id": email,
                    "title": title
                }}).then(results=>{
                    res.status(200).json({
                        "success": true,
                        "message": `${title} successfully deleted`
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error deleting logbook",
                        "error": error.message
                    })
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no logbook titled ${title}`,
                })
            }
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": `${title} title parameter`
        })
    }
}


module.exports = { createLogbook, getLogbook, updateLogbook, deleteLogbook }