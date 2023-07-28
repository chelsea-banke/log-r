const fieldCheck = (obj)=>{
    for(const key in obj){
        if(obj[key] === undefined || obj[key] === ''){
            return false
        }
    }
    return true
}

module.exports = fieldCheck