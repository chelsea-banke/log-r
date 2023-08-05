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
                    console.log(results)
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

module.exports = { createLogbook }