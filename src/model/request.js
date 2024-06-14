// import mongoose form index.js -> after created the mongoose setup and set the schema and model 
import mongoose from "./index.js";

// validate email 

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

//   const nows = Date.now();

    // Generate a random number between 0 and 999
    // const randomComponent = Math.floor(Math.random() * 1000);

    // Create the unique identifier by combining the current time and the random component
    // const uniqueIdentifier = 'SR' + ((Date.now()).toString() + ( Math.floor(Math.random() * 1000)).toString().padStart(3, '0'));

  // Get the current date and time
  const now = new Date();
  
  // Get the date as a string
  const date = now.toDateString();
  
  // Get the time as a string
  const time = now.toLocaleTimeString();
  const dateTime = `${date} ${time}`;

//create schema 
let requestSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    }, 
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:{
            validator: (value)=>validateEmail(value)
        }
    },
    srno:{
        type:String,
        default:'SR' + ((Date.now()).toString() + ( Math.floor(Math.random() * 1000)).toString().padStart(3, '0'))
    },
    type:{
        type:String,
        required:[true,'Type is required'],
    },
    
    title:{
        type:String,
        required:[true,'title is required'],
    },
    
    description:{
        type:String,
        required:[true,'description is required'],
    },
    status:{
        type:String,
        default:"Open"
    },
    createdAt:{
        type:String,
        default:dateTime
    },
    assignedTo:{
        type:String,
        default:null
    },
    assignedToId:{
        type:String,
        default:null
    },
     assignedAt:{
        type:String,
        default:null
    },
    closedAt:{
        type:String,
        default:null
    },
    resolution:{
        type:String,
        default:null
    }
},{
    collection:'request', /* In database create default database + 's', so ignore this problem */
    versionKey:false /* In database create default "v" add so ignore this problem */
})

//create model

const requestModel= mongoose.model('requests',requestSchema)

export default requestModel