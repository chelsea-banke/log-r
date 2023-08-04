const jwt = require("jsonwebtoken")

const userAuth = (req, res, next)=>{
    const jwtSecret = process.env.JWT_SECRET
    console.log(req.cookies)
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