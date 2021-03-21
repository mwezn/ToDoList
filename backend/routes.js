const express = require('express')
const router = express.Router()
const User= require("./models/Emailschema")
var bcrypt=require('bcrypt')
var nodemailer = require('nodemailer');
var jwt=require('jsonwebtoken');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'm.w.g.nelson@gmail.com',
    pass: 'M1ssiss!ppi'
  },
   tls: {
          rejectUnauthorized: false
      }
});




router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

router.post('/addTodo', async (req,res)=>{
  console.log(req.body.data)
  res.status(200).send();

})

router.post('/login', async (req, res) =>{

    const email =req.body.data.email
    const password =req.body.data.password
    try{
        const checkuser= await User.findOne({ "email": email })
        console.log(checkuser);
        if(checkuser){
          const cmp = await bcrypt.compare(password, checkuser.password);
          console.log("cmp"+ cmp)
          if (cmp) {
            //   ..... further code to maintain authentication like jwt or sessions
            const user= req.body.data;
            const token= jwt.sign({ user }, 'my_secret_key2')
            console.log(token)
            res.json({
              user: checkuser,
              token: token,
              text: "Auth Successful"
            });
            
          } else {
            res.status(401).send("Wrong username or password.");
          }
        } 
        else{
          res.status(400).send("Email Doesnt Exist")
        } 
        } catch (error) {
          console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
    
    

})


router.post('/register', async (req, res) => {
    try {
        const  email = req.body.data.email
        const  username = req.body.data.user
        const  password = req.body.data.password
        console.log(req.body.data)
        console.log(req.body.data.email)
        const checkuser= await User.findOne({email: email})
        if (checkuser) {return res.status(400).send("Email already exists")}
        var mailOptions = {
            from: 'm.w.g.nelson@gmail.com',
            to: email,
            subject: 'Welcome Youve Registered!',
            html: '<h1>That was easy!</h1>'
          };

        const user = await User.create({
            email,
            username,
            password
        })
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
    
})

module.exports=router;
