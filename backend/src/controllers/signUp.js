const Users = require("../models/users")
const fieldCheck = require("../utils/fieldCheck")

const signUp = async (req, res, next)=>{
    const credentials = req.body

    if (fieldCheck(credentials)){
        await Users.findByPk(credentials["email"]).then(async user=>{{
            if (user==null){
                await Users.create(credentials).then(newUser=>{
                    res.status(200).json({
                        "success": true,
                        "message": "account created",
                        "user": newUser
                    })
                }).catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "account not created",
                        "error": error.message
                    })
                })
            }
            else {
                res.status(400).json({
                    "success": false,
                    "message": "user already exist"
                })
            }
        }})
    }
    else{
        res.status(400).json({
            "success": false,
            "message": "Bad request",
            "data": credentials
        })
    }
    next()
}

module.exports = signUp