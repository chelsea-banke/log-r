const bcrypt = require("bcryptjs")
const Users = require("../../models/users")
const fieldCheck = require("../../utils/fieldCheck")

const updatePassword = async (req, res)=>{
    const passwords = req.body
    const email = res.locals.authEmail

    if (fieldCheck(passwords)){
        await Users.findByPk(email).then(user=>{
            const userData = user["dataValues"]
            
            bcrypt.compare(passwords["oldPassword"], userData["password"]).then(match=>{
                if(match){
                    bcrypt.genSalt(10).then(salt=>{
                        bcrypt.hash(passwords["newPassword"], salt).then(async hashedPassword=>{
                            
                            await Users.update({"password": hashedPassword}, {where: {"email": email}}).then(results=>{
                                res.status(200).json({
                                    "success": true,
                                    "message": "password updated"
                                })
                            }).catch(error=>{
                                res.status(500).json({
                                    "success": false,
                                    "message": "error updating password",
                                    "error": error.message
                                })
                            })
                        })
                    })
                }
                else{
                    res.status(400).json({
                        "success": false,
                        "message": "invalid old password"
                    })
                }
            })
        }).catch(error=>{
            res.status(400).json({
                "success": false,
                "message": "error getting user",
                "error": error.message
            })
        })
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "empty or undefined field detected"
        })
    }
}

const updateFields = async(req, res)=>{
    const fields = req.body
    const email = res.locals.authEmail

    if(fieldCheck(fields)){
        await Users.findByPk(email).then(async user=>{
            await Users.update({
                "first_name": fields["firstName"],
                "lastName": fields["lastName"]
            }, {
                "where": {"email": email}
            }).then(results=>{
                res.status(200).json({
                    "success": true,
                    "message": "user field(s) updatated"
                })
            }).catch(error=>{
                res.status(401).json({
                    "success": true,
                    "message": "error updating user fields",
                    "error": error.message
                })
            })
        }).catch(error=>{
            res.status(401).json({
                "success": false,
                "message": "error fetching user",
                "error": error.message
            })
        })
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "Invalid (empty) fields detected"
        })
    }
}

module.exports = { updatePassword, updateFields }