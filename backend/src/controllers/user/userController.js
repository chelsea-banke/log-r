const bcrypt = require("bcryptjs")
const Users = require("../../models/users")
const fieldCheck = require("../../utils/fieldCheck")

const updatePassword = async (req, res)=>{
    const passwords = req.body

    if (fieldCheck(passwords)){
        await Users.findByPk("cb@gmail.com").then(user=>{
            const userData = user["dataValues"]
            
            bcrypt.compare(passwords["oldPassword"], userData["password"]).then(match=>{
                if(match){
                    bcrypt.genSalt(10).then(salt=>{
                        bcrypt.hash(passwords["newPassword"], salt).then(async hashedPassword=>{
                            
                            await Users.update({"password": hashedPassword}, {where: {"email": "cb@gmail.com"}}).then(results=>{
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
        })
    }
    else {
        res.status(400).json({
            "success": false,
            "message": "empty or undefined field detected"
        })
    }
}


module.exports = {updatePassword}