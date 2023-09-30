const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Users = require("../../models/users")
const Manuals = require("../../models/manuals")
const Logs = require("../../models/logs")
const fieldCheck = require("../../utils/fieldCheck")
const { where } = require("sequelize")

const signIn = async (req, res, next)=>{
    const credentials = req.body
    const jwtSecret = process.env.JWT_SECRET

    if(fieldCheck(credentials)){
        await Users.findByPk(credentials["email"]).then(async user=>{
            if(user != null){
                bcrypt.compare(credentials["password"], user["dataValues"]["password"]).then(async match => {

                    if (match){
                        const userData = user["dataValues"]

                        if(userData["role"]=="admin"){
                            await Manuals.findAll().then(async manuals=>{
                                userData["logbooks"] = await Promise.all(manuals.map(async manual=>{
                                    const logs = await Logs.findAll({"where": {
                                        "manual_id": manual["dataValues"]["title"],
                                        "manual_user_id": manual["dataValues"]["user_id"]
                                    }})
                                    manual["dataValues"]["logs"] = logs.map(log=>{return(log["dataValues"])})
                                    return manual["dataValues"]
                                }))
                            })

                            .catch(error=>{
                                res.status(401).json({
                                    "success": false,
                                    "message": "error fetching Manuals",
                                    "error": error.message
                                })
                            })
                        }
                        else{
                            await Manuals.findAll({"where": {"user_id": userData["email"]}}).then(async manuals=>{
                                userData["logbooks"] = await Promise.all(manuals.map(async manual=>{
                                    const logs = await Logs.findAll({"where": {
                                        "manual_id": manual["dataValues"]["title"],
                                        "manual_user_id": manual["dataValues"]["user_id"]
                                    }})
                                    manual["dataValues"]["logs"] = logs.map(log=>{return(log["dataValues"])})
                                    return manual["dataValues"]
                                }))
                            })  
                            .catch(error=>{
                                res.status(401).json({
                                    "success": false,
                                    "message": "error fetching Manuals",
                                    "error": error.message
                                })
                            })
                        }

                        const token = jwt.sign(
                            {"email": user["dataValues"]["email"]},
                            jwtSecret,
                            {"expiresIn": 3600}
                        )
                        
                        res.cookie("jwt", token, {
                            "httpOnly": true,
                            "maxAge": 3600000
                        })
                        
                        delete userData.password
                        res.status(200).json({
                            "success": true,
                            "message": "signIn successful",
                            "user": userData
                        })
                    }
                    else{
                        res.status(409).json({
                            "success": false,
                            "message": "incorrect password"
                        })
                    }
                })
            }
            else{
                res.status(409).json({
                    "success": false,
                    "message": `account with email ${credentials["email"]} does not exist`
                })
            }
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": "bad request",
            "data": credentials
        })
    }
}

module.exports = signIn