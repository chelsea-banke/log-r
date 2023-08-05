const jwt = require("jsonwebtoken")
const Users = require("../models/users")

const userAuth = (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, async (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "Not Authorized",
                    "error": error.message
                }))
            }
            else {
                await Users.findByPk(decodedToken["email"]).then(user=>{
                    if(user){
                        res.locals.authEmail = decodedToken["email"]
                        next()
                    }
                    else{
                        console.log(user)
                        return(res.status(400).json({
                            "success": false,
                            "message": `user with email ${decodedToken["email"]} not found`
                        }))
                    }
                })
            }
        })
    }
    else {
        return (res.status(401).json({
            "success": false,
            "message": "Not Authorized, token not found",
        }))
    }
}

module.exports = userAuth