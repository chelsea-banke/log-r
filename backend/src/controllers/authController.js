const express  = require("express")
const fieldCheck = require("../utils/fieldCheck")
const {signUp, signIn} = require("../services/authService")

const router = express.Router()

router.post('/signup', async(req, res, next)=>{
    const credentials = req.body
    if (fieldCheck(credentials)){
        const created = await signUp(credentials)
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

router.post("/signin", async(req, res, next)=>{
    const credentials = req.body
    if(fieldCheck(credentials)){
        const results = await signIn(credentials)
        if (results["email"]){
            if (results["password"]){
                res.status(200).json({
                    "success": true,
                    "message": "signIn succesfull",
                    "data": results["data"]
                })
            }
            else {
                res.status(409).json({
                    "success": false,
                    "message": "wrong password",
                    "data": "password"
                })
            }
        }
        else {
            res.status(409).json({
                "success": false,
                "message": "account does not exist",
                "data": "email"
            })
        }
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "Bad request",
            "data": credentials
        })
    }
    next()
})


module.exports = router