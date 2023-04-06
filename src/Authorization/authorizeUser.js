const responses = require("../Helpers/responses")

module.exports = {
        authorizeUser(req,res,next){
            if(req.body.userID === req.auth.userID){
                next()
            }else{
                return responses.error(res,"User is not the same as the logged-in User",401)
            }
        }
}