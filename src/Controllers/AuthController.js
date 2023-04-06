const asyncAction = require("../Helpers/asyncAction").asyncAction
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const responses = require("../Helpers/responses")
const con = require("../databaseConnector").dbConnector

let loginFunc=  (req,res)=>{
    let username = req.body.username
    let password = req.body.password


    con.query("SELECT userID,userName,userPass from users WHERE userName = ?",[username],(err,results,field)=>{
        if(err)  return responses.error(res,"Database Error",401);

        if(results.length <= 0){
            return responses.error(res,"No user found",401)
        }

        let foundUser = results[0];
         bcrypt.compare(password, foundUser.userPass).then((status)=>{
                if(status === false){
                    return responses.error(res,"Password does not match",401)
                }

                //Success
                
                let token = jwt.sign(foundUser,process.env.ACCESS_SECRET,{
                    expiresIn:"5 days"
                })
                return responses.success(res,{
                    token:token,
                    userID : foundUser.userID,
                    username: foundUser.userName
                })
        })

        
    })



}

let registerFunc =  (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    if(password !== confirmPassword) return responses.error(res,"Please enter correct confirm-password",400)


    con.query("SELECT userID,userName from users WHERE userName = ?",[username],(err,results,field)=>{

        if(err) return responses.error(res,"Error while querying user",400)
        if(results.length > 0) return responses.error(res,"User already exists",400)

        if(results.length === 0 ){
               bcrypt.hash(password,10).then((hashedPassword) =>{
                    con.query("INSERT INTO users(userID,userName,userPass) VALUES (default,?,?)",[username,hashedPassword], (err,result,field) =>{
                        if(err) return responses.error(res,"Error inserting user",400, {internalError: err})

                       return responses.success(res,{
                            message:"User registered successfully, please login!"
                        },219)
                    })
               }).catch((err)=>{
                return responses.error(res,"Error Hashing password",500,{internalError : err})
               })


        }

        })


}

module.exports = {
    login : loginFunc,
    register : registerFunc
}