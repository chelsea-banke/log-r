const express  = require("express")
const fieldCheck = require("../utils/fieldCheck")
const signup = require("../services/authService")

const router = express.Router()

router.post('/signup', async(req, res, next)=>{
    const credentials = req.body
    if (fieldCheck(credentials)){
        const created = await signup(credentials)
        if(created){
            res.status(200).json({
                "success": true,
                "message": "account created",
                "data": credentials
            })
        } else {
            res.status(409).json({
                "success": false,
                "message": "account already exist",
                "data": credentials
            })
        }
    } else {
        res.status(400).json({
            "success": false,
            "message": "Bad request",
            "data": credentials
        })
    }
    next()
})

module.exports = router