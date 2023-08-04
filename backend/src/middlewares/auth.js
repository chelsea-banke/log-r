const jwt = require("jsonwebtoken")

const userAuth = (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    const token = req.cookies.jwt
    if (token){
        jwt.verify(token, jwtSecret, (error, decodedToken)=>{
            if(error){
                return (res.status(401).json({
                    "success": false,
                    "message": "Not Authorized",
                    "error": error.message
                }))
            }
            else {
                res.locals.authEmail = decodedToken["email"]
                next()
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