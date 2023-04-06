const responses = require("../Helpers/responses")
    const jwt = require("jsonwebtoken")
module.exports = {
    authenticateToken (req, res, next) {
    if(!req.headers.authorization) return responses.error(res,"No Authentication Token Provided!",401)
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token,process.env.ACCESS_SECRET);
        next();
    }catch(err) {
       if(err.expiredAt){        
           return responses.error(res,"Token Expired!",400,{tokenExpired:true})

       }
       if(err){
            console.error(err)
           return responses.error(res,"Couldn't Authenticate User",500,{internalError:err})
       }
    }
  
}
}