
asyncAction = (action)=>{
   return (req,res,next) => {
     const promise = action(req,res,next)

         Promise.resolve(promise).catch(next)
   }
        
}

module.exports = {
    asyncAction: asyncAction
}
