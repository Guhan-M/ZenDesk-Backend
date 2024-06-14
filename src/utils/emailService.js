import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

const sendEmail = async (email,subject,html) => {
  // Send the token to the user's email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Email configuration
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: subject,
    html: html,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
   return res.status(200).send({ message: "Email sent" });
  });
};


const sendCofirmMail = async(data)=>{
 try{
  let subject = `${data.srno} : Your request is received`
  let html = `<div>
  <h1 style="text-align: center;">Zendesk</h1>
  <p>Hello ${data.name},</p>
  <p>Greetings for the day!</p>
  <p>We have received your request successfully and the same will be resolved at the earliest. PFB the details</p>
  <table>
      <tbody>
          <tr>
              <td>SR NO</td>  
              <td>${data.srno}</td>
          </tr>
          <tr>
              <td>Type</td>  
              <td>${data.type}</td>
          </tr>
          <tr>
              <td>Title</td>  
              <td>${data.title}</td>
          </tr>
          <tr>
              <td>Description</td>  
              <td>${data.description}</td>
          </tr>
          <tr>
              <td>Created At</td>  
              <td>${data.createdAt}</td>
          </tr>
          <tr>
              <td>Status</td>  
              <td>${data.status}</td>
          </tr>
      </tbody>
  </table>
  <p>You can check the status of your request in this <a href="${process.env.APP_URL}/request-status?srno=${data.srno}">link</a></p>
  <p>Thanks,</p>
  <h4>Zendesk Team</h4>
</div>`
    await sendEmail(data.email,subject,html)
 } 
 catch(error){
  console.log(error)
 }  
}

const sendAsssignedMail = async(data)=>{
  try{
  let subject = `${data.srno} Your request is assigned to our staff `
  let html = `<div>
         <h1 style="text-align: center;">Zendesk</h1>
         <p>Hello ${data.name},</p>
         <p>Greetings for the day!</p>
         <p>Your request is assigned to our captain ${data.assignedTo} and the same will be resolved at the earliest. PFB the details</p>
         <table>
             <tbody>
                 <tr>
                     <td>SR NO</td>  
                     <td>${data.srno}</td>
                 </tr>
                 <tr>
                     <td>Type</td>  
                     <td>${data.type}</td>
                 </tr>
                 <tr>
                     <td>Title</td>  
                     <td>${data.title}</td>
                 </tr>
                 <tr>
                     <td>Description</td>  
                     <td>${data.description}</td>
                 </tr>
                 <tr>
                     <td>Created At</td>  
                     <td>${data.createdAt}</td>
                 </tr>
                  <tr>
                     <td>Status</td>  
                     <td>${data.status}</td>
                 </tr>
                  <tr>
                     <td>Assigned To</td>  
                     <td>${data.assignedTo}</td>
                 </tr>
                  <tr>
                     <td>Assigned At</td>  
                     <td>${data.assignedAt}</td>
                 </tr>
             </tbody>
         </table>
         <p>You can check the status of your request in this <a href="${process.env.APP_URL}/request-status?srno=${data.srno}">link</a></p>
         <p>Thanks,</p>
         <h4>Zendesk Team</h4>
     </div>`
     await sendEmail(data.email,subject,html)
  } 
  catch(error){
   console.log(error)
  }  
 }

const sendClosedMail = async(data)=>{
  try{
  let subject = `${data.srno}Your request is resolved`
  let html = `<div>
         <h1 style="text-align: center;">Zendesk</h1>
         <p>Hello ${data.name},</p>
         <p>Greetings for the day!</p>
         <p>Your request is resolved by our team. PFB the details</p>
         <table>
             <tbody>
                 <tr>
                     <td>SR NO</td>  
                     <td>${data.srno}</td>
                 </tr>
                 <tr>
                     <td>Type</td>  
                     <td>${data.type}</td>
                 </tr>
                 <tr>
                     <td>Title</td>  
                     <td>${data.title}</td>
                 </tr>
                 <tr>
                     <td>Description</td>  
                     <td>${data.description}</td>
                 </tr>
                 <tr>
                     <td>Created At</td>  
                     <td>${data.createdAt}</td>
                 </tr>
                  <tr>
                     <td>Status</td>  
                     <td>${data.status}</td>
                 </tr>
                  <tr>
                     <td>Assigned To</td>  
                     <td>${data.assignedTo}</td>
                 </tr>
                  <tr>
                     <td>Assigned At</td>  
                     <td>${data.assignedAt}</td>
                 </tr>
                 <tr>
                   <td>Closed At</td>  
                   <td>${data.closedAt}</td>
                </tr>
                <td>Resolution</td>  
                 <td>${data.resolution}</td>
                </tr>
             </tbody>
         </table>
         <p>You can check the status of your request in this <a href="${process.env.APP_URL}/request-status?srno=${data.srno}">link</a></p>
         <p>Thanks,</p>
         <h4>Zendesk Team</h4>
     </div>`
     await sendEmail(data.email,subject,html)
  } 
  catch(error){
   console.log(error)
  }  
 }

export default {
  sendCofirmMail,
  sendAsssignedMail,
  sendClosedMail
} 