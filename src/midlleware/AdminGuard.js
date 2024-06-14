import Auth from '../utils/auth.js'

const superAdminGuard = async(req,res,next)=>{
    try{
        let token = req?.headers?.authorization?.split(" ")[1]  /* token from the header of the  url  get and split the 2 one of the authorization */
        if(token){
            let payload = await Auth.decodeToken(token)
                if(payload.role === 'superAdmin'){
                    next()
                }
                else{
                res.status(402).send({message:"Permission Denied"})
            }
        }
        else{
            res.status(402).send({message:"Token Not found"})
        }
    } 
    catch(error){
        res.status(500).send({
            message:"Internal server error",
            error:error.message
        })
    }
}


export default superAdminGuard