
module.exports = {
        success : (res,data,code=200)=>{

            return res.status(code).send({
                success : true,
                data: {...data},
                error : ""
            })
        },
        error : (res,errorMessage,code=400,extraPayload = {})=>{


            return res.status(code).send({
                success : false,
                error : errorMessage,
                data : extraPayload
            })

        }


}