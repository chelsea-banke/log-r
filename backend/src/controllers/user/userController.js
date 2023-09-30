const bcrypt = require("bcryptjs")
const Users = require("../../models/users")
const Manuals = require("../../models/manuals")
const Logs = require("../../models/logs")
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
                "last_name": fields["lastName"]
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
    const email = req.params["email"].slice(1)
    // console.log(email)
    await Users.findByPk(email).then(async user=>{
        console.log(email)
        const userData = user.dataValues

        if(userData["role"]=="admin"){
            await Manuals.findAll().then(async manuals=>{
                userData["logbooks"] = await Promise.all(manuals.map(async manual=>{
                    const logs = await Logs.findAll({"where": {
                        "manual_id": manual["dataValues"]["title"],
                        "manual_user_id": manual["dataValues"]["user_id"]
                    }})
                    manual["dataValues"]["logs"] = logs.map(log=>{return(log["dataValues"])})
                    return manual["dataValues"]
                }))
            })
            .catch(error=>{
                res.status(401).json({
                    "success": false,
                    "message": "error fetching Manuals",
                    "error": error.message
                })
            })
        }
        else{
            await Manuals.findAll({"where": {"user_id": userData["email"]}}).then(async manuals=>{
                userData["logbooks"] = await Promise.all(manuals.map(async manual=>{
                    const logs = await Logs.findAll({"where": {
                        "manual_id": manual["dataValues"]["title"],
                        "manual_user_id": manual["dataValues"]["user_id"]
                    }})
                    manual["dataValues"]["logs"] = logs.map(log=>{return(log["dataValues"])})
                    return manual["dataValues"]
                }))
            })     
            .catch(error=>{
                res.status(401).json({
                    "success": false,
                    "message": "error fetching Manuals",
                    "error": error.message
                })
            })
        }
        
        delete userData.password
        res.status(200).json({
            "success": true,
            "message": "signIn successful",
            "user": userData
        })
    }).catch(error=>{
        res.status(400).json({
            "success": false,
            "message": "error fetching user",
            "error": error.message
        })
    })
}

const getAll = async (req, res)=>{
    await Users.findAll().then(async users=>{
        await Promise.all(
            users.map(async user=>{
                const userData = user["dataValues"]
                await Manuals.findAll({"where": {"user_id": userData["email"]}}).then(manuals=>{
                    userData["logbooks"] = manuals.map(manual=>{
                        return manual["dataValues"]
                    })
                    delete userData.password
                    return userData
                })
                .catch(error=>{
                    res.status(401).json({
                        "success": false,
                        "message": "error fetching Manuals",
                        "error": error
                    })
                })
            })
        )
        res.status(200).json({
            "success": true,
            "message": "signIn successful",
            "users": users
        })
    }).catch(error=>{
        res.status(400).json({
            "success": false,
            "message": "error fetching user",
            "error": error.message
        })
    })
}

module.exports = { updatePassword, updateUser, deleteUser, getUser, getAll }