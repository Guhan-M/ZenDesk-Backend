import UserModel from '../model/user.js'
import Auth from '../utils/auth.js'

const signUp = async (req,res)=>{
    try{
        let user= await UserModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password) /* send the argument to hashpassword */
            await UserModel.create(req.body) /* create the data with schema and model */
            res.status(201).send({
                message:"User signup successfull"
            })
        }
            else{
                res.status(400).send({
                    message:`User with ${req.body.email} already exists`
                })
            }
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const login = async (req,res)=>{
    try{
        let user= await UserModel.findOne({email:req.body.email})
        if(user){
            if(await Auth.hashCompare(req.body.password,user.password))
            {
                let token = await Auth.createtoken({
                    name:user.name,
                    email:user.email,
                    id:user._id,
                    role:user.role
                    /*Payload setup for create token*/
                })
                res.status(200).send({
                    message:"Login successfull",
                    name:user.name,
                    id:user._id,
                    role:user.role,
                    token /* Return the token and name,id,role details*/ 
                })
            }
            else{
                res.status(400).send({
                    message:`Incorrect Password`
                })
        }
           
            }
            else{
                res.status(400).send({
                    message:`User with ${req.body.email} does not exists`
                })
            }
        }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const getAllUsers = async (req,res)=>{
    try{
        let users = await UserModel.find({},{password:0}) // Ignore the password in the return data - use this method password :0
        res.status(200).send({
            message:"Data fetch successfull",
            users
        })
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}

const getUserById = async (req,res)=>{
    try{
        let user = await UserModel.findOne({_id:req.params.id},{password:0}) // Ignore the password in the return data - use this method password :0
        res.status(200).send({
            message:"Data fetch successfull",
            user
        })
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}

export default {
    signUp,
    login,
    getAllUsers,
    getUserById
}