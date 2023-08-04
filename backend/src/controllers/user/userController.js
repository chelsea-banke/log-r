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

const updateUser = async(req, res)=>{
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
            res.status(400).json({
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

const deleteUser = async (req, res)=>{
    const email = res.locals.authEmail
    await Users.findByPk(email).then(user=>{
        Users.destroy({"where": {"email": email}}).then(results=>{
            res.status(200).json({
                "successs": true,
                "message": `user with email ${email} successfully deleted`
            })
        }).catch(error=>{
            res.send(401).json({
                "success": false,
                "message": "error deleting user",
                "error": error.message
            })
        })
    }).catch(error=>{
        res.status(400).json({
            "success": false,
            "message": "error fetching user",
            "error": error.message
        })
    })
}

const getUser = async (req, res)=>{
    const email = res.locals.authEmail
    await Users.findByPk(email).then(user=>{
        const userData = user["dataValues"]
        delete userData.password
        res.status(200).json({
            "success": true,
            "message": "successfull fetch of user data",
            "data": userData
        })
    }).catch(error=>{
        res.status(400).json({
            "success": false,
            "message": "error fetching user",
            "error": error.message
        })
    })
}
module.exports = { updatePassword, updateUser, deleteUser, getUser }