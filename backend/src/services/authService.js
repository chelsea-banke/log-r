const Users = require("../models/users")

const signUp = async (credentials)=>{
    if (await Users.findByPk(credentials["email"]) == null){
        await Users.create(credentials)
        return true
    }
    else {
        return false
    }
}

const signIn = async (credentials)=>{
    let results = {
        "email": undefined,
        "password": undefined,
        "data": undefined
    }
    const user = (await Users.findByPk(credentials["email"]))
    if (user != null){
        const userData = user["dataValues"]
        results["email"] = true
        if (userData["password"]==credentials["password"]){
            results["password"] = true
            results["data"] = userData
            return results
        }
        else {
            results["password"] = false
            return results
        }
    }
    else {
        results["email"] = false
        return results
    }
}

module.exports = {signUp, signIn}