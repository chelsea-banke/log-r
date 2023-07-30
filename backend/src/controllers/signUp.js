const bcrypt = require("bcryptjs")
const Users = require("../models/users")
const fieldCheck = require("../utils/fieldCheck")

const signUp = async (req, res)=>{
    const credentials = req.body

    if (fieldCheck(credentials)){
        await Users.findByPk(credentials["email"]).then(async user=>{
            
            if (user==null){
                bcrypt.genSalt(10).then(salt=>{
                    bcrypt.hash(credentials["password"], salt).then(async hashedPassword=>{
                        credentials["password"] = hashedPassword

                        await Users.create(credentials).then(newUser=>{
                            res.status(200).json({
                                "success": true,
                                "message": "account created",
                                "user": newUser["dataValues"]
                            })
                        }).catch(error=>{
                            res.status(500).json({
                                "success": false,
                                "message": "account not created",
                                "error": error.message
                            })
                        })
                    })
                })
            }
            else {
                res.status(400).json({
                    "success": false,
                    "message": "user already exist"
                })
            }
        })
    }
    else{
        res.status(400).json({
            "success": false,
            "message": "Bad request",
            "data": credentials
        })
    }
}

module.exports = signUp