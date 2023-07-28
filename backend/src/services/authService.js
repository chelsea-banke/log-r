const Users = require("../models/users")

const signup = async (credentials)=>{
    if (await Users.findByPk(credentials["email"]) == null){
        await Users.create(credentials)
        return true
    }
    else {
        return false
    }
}

module.exports = signup