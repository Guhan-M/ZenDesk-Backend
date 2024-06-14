import requestModel from "../model/request.js"
// import userModel from "../model/user"
import emailService from "../utils/emailService.js"

// Get the current date and time
const now = new Date();

// Get the date as a string
const date = now.toDateString();

// Get the time as a string
const time = now.toLocaleTimeString();

// Combine date and time
const dateTime = `${date} ${time}`;

const getRequestCount = async(req,res)=>{
    try{
        let data = await requestModel.aggregate([
            {$group:{_id:"$status",total:{$sum:1}}}
        ])
        let countData={}
        data.forEach((e,i)=>{
            countData[e._id]=e.total
        })
        res.status(200).send(countData)
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
    }
}

const getRequestByStatus = async(req,res)=>{
    try{
        let status = req.query.status
        if(status){
            let request = await requestModel.find({status:status})
            res.status(200).send({
            message:"Data fetch successfully",
            request
        })
        }
        else{
            res.status(400).send({
                message:"Invalid request"
            })
        }
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal server error",
            error
        })
    }
}

const createRequest = async(req,res)=>{
    try{
        const requestBody = {
            ...req.body,
            srno:  'SR' + ((Date.now()).toString() + ( Math.floor(Math.random() * 1000)).toString().padStart(3, '0'))
        };
       
       let request = await requestModel.create(requestBody)
       
       // email the user
        await emailService.sendCofirmMail(requestBody)
        res.status(201).send({
            message:"Your Request is Submitted",
            srno:request.srno
        })
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

const getRequestDetails = async(req,res)=>{
try{
    let srno =  req.params.id
    let request = await requestModel.findOne({srno:srno},{_id:0,assignedToId:0})
    if(request){
        res.status(200).send({
            message:"Details fetch successfully",
            request
        })
    }
    else{
        res.status(400).send({
            message:"Invalid SR Number",
        })
    }
}
catch(error){
    res.status(500).send({
        message:error.message || "Internal Server Error",
        error
    })
}
}

const assignRequest = async (req,res)=>{
    try{
        let userData =  req.userData
        
        let srno = req.params.srno
        let request = await requestModel.findOne({srno:srno})
        if(request && request.status === "Open"){
            request.assignedTo = userData.name
            request.assignedToId = userData._id
            request.status = "Assigned"
            request.assignedAt = dateTime
            await request.save() 
            await emailService.sendAsssignedMail(request)

            res.status(200).send({
                message:"Request Assigned successfully",
            })
        }
        else{
            res.status(400).send({
                message:"Invalid SR Number",
            })
        }
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
} 

const closeRequest = async (req,res)=>{
    try{
        let userData =  req.userData
        let resolution = req.body.resolution
        let srno = req.params.srno
        let request = await requestModel.findOne({srno:srno})
        if(request && request.status == "Assigned" && request.assignedToId ===  userData._id.toString())
        {
            
            request.status = "Closed"
            request.closedAt = dateTime
            request.resolution = resolution
            await request.save() 
            await emailService.sendClosedMail(request)

            res.status(200).send({
                message:"Request Closed successfully",
            })
        }
        else{
            res.status(400).send({
                message:"Invalid SR Number",
            })
        }
    }
    catch(error){
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

export default {
  
    getRequestCount,
    createRequest,
    getRequestDetails,
    assignRequest,
    closeRequest,
    getRequestByStatus
}