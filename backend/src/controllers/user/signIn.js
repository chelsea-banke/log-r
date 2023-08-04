const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Users = require("../../models/users")
const fieldCheck = require("../../utils/fieldCheck")

const signIn = async (req, res, next)=>{
    const credentials = req.body
    const jwtSecret = process.env.JWT_SECRET

    if(fieldCheck(credentials)){
        await Users.findByPk(credentials["email"]).then(user=>{
            if(user != null){
                bcrypt.compare(credentials["password"], user["dataValues"]["password"]).then(match => {

                    if (match){
                        const token = jwt.sign(
                            {"email": user["dataValues"]["email"]},
                            jwtSecret,
                            {"expiresIn": 3600}
                        )
                        
                        res.cookie("jwt", token, {
                            "httpOnly": true,
                            "maxAge": 3600
                        })

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