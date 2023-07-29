const Users = require("../models/users")
const fieldCheck = require("../utils/fieldCheck")

const signIn = async (req, res, next)=>{
    const credentials = req.body

    if(fieldCheck(credentials)){
        await Users.findByPk(credentials["email"]).then(user=>{
            if(user != null){
                if (user["dataValues"]["password"] == credentials["password"]){
                    res.status(200).json({
                        "success": true,
                        "message": "signIn successful",
                        "user": user["dataValues"]
                    })
                }
                else{
                    res.status(409).json({
                        "success": false,
                        "message": "incorrect password"
                    })
                }
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
    next()
}

module.exports = signIn