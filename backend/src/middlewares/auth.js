const jwt = require("jsonwebtoken")
const Users = require("../models/users")
const Logbooks = require("../models/logbooks")

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

const logbookAuth = async (req, res, next)=>{
    const email = res.locals.authEmail
    console.log(req.params)
    const title = req.params["title"].slice(1)
    if(title){
        await Logbooks.findAll({"where": {
            "user_id": email,
            "title": title
        }}).then(logbooks=>{
            if(logbooks[0]){
                next()
            }
            else{
                return(res.status(400).json({
                    "success": false,
                    "message": `user with email ${email} has no logbooks titled ${title}`
                }))
            }
        }).catch(error=>{
            return(res.status(401).json({
                "success": false,
                "message": "error fetching logbook",
                "error": error.message
            }))
        })
    }
    else{
        return(res.status(400).json({
            "success": false,
            "message": `${title} value passed as logbook parameter`
        }))
    }
}


module.exports = { userAuth, logbookAuth}