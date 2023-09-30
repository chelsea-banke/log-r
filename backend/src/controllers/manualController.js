const e = require("express")
const Manuals = require("../models/manuals")
const Logs = require("../models/logs")
const fieldCheck = require("../utils/fieldCheck")

const createManual = async (req, res)=>{
    const email = res.locals.authEmail
    const manualData = req.body
    if(fieldCheck(manualData)){
        await Manuals.findAll({"where":{
            "title": manualData["title"],
            "user_id": email
        }
        }).then(async manuals=>{
            const manual = manuals[0]
            if(manual){
                res.status(400).json({
                    "success": false,
                    "message": `manual with title ${manualData["title"]} already exist`
                })
            }
            else{
                manualData["user_id"] = email
                await Manuals.create(manualData).then(async manual=>{
                    console.log(manualData)
                    for(let week = 1; week <= parseInt(manualData["weeks"]); week++){
                        await Logs.create({
                            "week": week,
                            "objectives": '',
                            "outcome": '',
                            "remarks": "",
                            "review": "",
                            "status": "pending",
                            "manual_id": manualData["title"],
                            "manual_user_id": email
                        })
                    }
                    await Logs.findAll({"where": {
                        "manual_id": manualData["title"],
                        "manual_user_id": email
                    }}).then(logs=>{
                        manual["logs"] = logs.map(log=>{return(log["dataValues"])})
                        res.status(200).json({
                            "success": true,
                            "message": "successfull creation of manual",
                            "manual": manual
                        })
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error creating manual",
                        "error": error
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

const getManual = async (req, res)=>{
    const email = req.params["email"].slice(1)
    const title = req.params["title"].slice(1)
    console.log(email, title)
    if(title){
        await Manuals.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(async manuals=>{
            const manual = manuals[0]["dataValues"]
            if(manual){
                await Logs.findAll({"where": {
                    "manual_id": manual["title"],
                    "manual_user_id": email
                }}).then(logs=>{
                    manual["logs"] = logs.map(log=>{return(log["dataValues"])})
                    res.status(200).json({
                        "success": true,
                        "message": "manual fetch successfull",
                        "manual": manual
                    })
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no manual titled ${title}`,
                })
            }
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching manual",
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

const updateManual = async (req, res)=>{
    const email = res.locals.authEmail
    const title = req.params["title"].slice(1)
    const manualData = req.body
    if(fieldCheck(manualData)){
        await Manuals.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(async Manuals=>{
            if(Manuals[0]){
                await Manuals.update(manualData, {"where": {
                    "user_id": email,
                    "title": title
                }}).then(results=>{
                    res.status(200).json({
                        "success": true,
                        "message": "manual successfully updated",
                        "manual": manualData
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error updating manual",
                        "error": error.message
                    })
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no manual titled ${title}`,
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

const deleteManual = async (req, res)=>{
    const email = res.locals.authEmail
    const title = req.params["title"].slice(1)
    if(title){
        await Manuals.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(async manuals=>{
            if(manuals[0]){
                await Manuals.destroy({"where": {
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
                        "message": "error deleting manual",
                        "error": error.message
                    })
                })
            }
            else{
                res.status(400).json({
                    "success": false,
                    "message": `user ${email} has no manual titled ${title}`,
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

module.exports = { createManual, getManual, updateManual, deleteManual }