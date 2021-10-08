const Users = require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const nodemailer = require('nodemailer');
const fetch = require('node-fetch')
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const option = {
    service: 'gmail',
    auth: {
        user: 'dinhphi751@gmail.com', // email hoặc username
        pass: 'Dinhtruongphi1234' // password
    }
};

const transporter = nodemailer.createTransport(option);
const userCtrl = {
register: async (req,res) =>{
  try{
    const {name,email,password} = req.body;
  
    const verifytoken = jwt.sign({email: req.body.email}, "bezkoder-secret-key")
    const user = await Users.findOne({email})
    
    const mail = {
        from: option.auth.user, // Địa chỉ email của người gửi
        to: email, // Địa chỉ email của người nhaan
        subject: 'Please confirm your account ', // Tiêu đề mail
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Cảm ơn bạn đã đăng kí , vui lòng click vào link dưới để kích hoạt tài khoản </p>
        <a href='http://localhost:3000/user/auth/verify/${verifytoken}'> Click here</a>
        </div>`, // Nội dung mail dạng wtext
    };
    if(user) return res.status(400).json({msg: "The Email already exits"})
    
    if(password.length < 6 ) return res.status(400).json({msg: "Password is at least 6 characters long "})

    // Password Encryption
    const passwordHash = await bcrypt.hash(password,10)
    const newUser = new Users({
        name,email,password:passwordHash,
        confirmationCode: verifytoken,
        status:'Pending'
    })
    // save mongo

    newUser.save(); 
    
      transporter.sendMail(mail, function(error, info) {
        if (error) { // nếu có lỗi
        } else { //nếu thành công
        }
    });
    // send mail
    
    // accessToken
    const accesstoken = createAcessToken({id:newUser._id})
    const refreshtoken = createFreshToken({id:newUser._id})

    res.cookie('refreshtoken',refreshtoken,{
        httpOnly: true,
        path: '/user/refresh_token'
    })
    res.json({msg:"Register Success",'accessToken':accesstoken,'confirmationCode':verifytoken})
}

  catch(err) {
      res.status(400).json({msg:err.message})
      return res.status(400).json({msg: err.message})
  }
},
login : async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg:"User does not exit."})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"Password is incorret"})
        // If login success,create accesstoken and refresh token
        const accesstoken = createAcessToken({id:user._id})
        const refreshtoken = createFreshToken({id:user._id})
        res.cookie('refreshtoken',refreshtoken,{
            httpOnly: true,
            path: '/user/refresh_token'
        })
        res.json({msg:"Login Success",'accesstoken':accesstoken,'verifyToken':user.confirmationCode})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
 googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, name, picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await Users.findOne({email}).select('-password')

            if(user){
                const accesstoken = createAcessToken({id:user._id})
        const refreshtoken = createFreshToken({id:user._id})
                res.cookie('refreshtoken',refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                  await Users.findOneAndUpdate({email},{status:"Active"})
                     const userToken = createAcessToken({user})

                      res.json({user,userToken})

            }else{
                 const verifytoken = jwt.sign({email: req.body.email}, "bezkoder-secret-key")
                const newUser = new Users({
                    name, email, password: passwordHash, status:"Active",confirmationCode:verifytoken
                })
                await newUser.save()
                 
                 const accesstoken = createAcessToken({id:newUser._id})
                const refreshtoken = createFreshToken({id:newUser._id})
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                     const userToken = createAcessToken({newUser})

                res.json({user:newUser,userToken})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
      facebookLogin: async (req, res) => {
        try {
            const {accessToken, userID} = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})

            const {email, name, picture} = data
            const password = email + process.env.GOOGLE_SECERT

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({email})
            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                  const accesstoken = createAcessToken({id:user._id})
                const refreshtoken = createFreshToken({id:user._id})
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                     const userToken = createAcessToken({user})

                res.json({user,userToken})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, status:"Active"
                })

                await newUser.save()
                
                const accesstoken = createAcessToken({id:newUser._id})
                const refreshtoken = createFreshToken({id:newUser._id})
                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })
                     const userToken = createAcessToken({newUser})

                res.json({user:newUser,userToken})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

verify : async(req,res)=>{
    try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token,"bezkoder-secret-key")

            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check.status === "Pending") {
                await Users.findOneAndUpdate({email},{status:"Active"})
                return res.json({msg : "Active account successfully"})
            }
            if(check.status === "Active") {
                return res.status(400).json({msg:"Your account has been activated"})
            }

           

           

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
},
logout : async(req,res)=>{
try {
    res.clearCookie('refreshtoken',{ path: '/user/refresh_token'})
    return res.json({msg:"Logged out"})
} catch (err) {
    return err.status(500).json({msg:err.message})
}
},
refreshToken: (req,res)=>{
    try {
        
        const rf_token = req.cookies.refreshtoken;
    if(!rf_token) return res.status(401).json({msg:"Please Login or Register"})

        jwt.verify(rf_token,process.env.REFESH_TOKEN_SECERT,(err,user)=>{
            if(err) return res.status(402).json({msg: "Please Login or Register"})
            const accesstoken = createAcessToken({id:user.id})
            res.json({user,accesstoken})
        })
    }

     catch (error) {
        return res.status(500).json({msg: errror.message})
    }
},
getUser: async(req,res)=>{
  try {
      const user = await Users.findById(req.user.id).select('-password')
      if(!user) return res.status(400).json({msg:"User does not exist"})
      const userToken = createAcessToken({user})
      res.json({user,userToken})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}

}

const createAcessToken = (user) =>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECERT,{expiresIn: '1d'})
}
const createFreshToken = (user) =>{
    return jwt.sign(user,process.env.REFESH_TOKEN_SECERT,{expiresIn: '7d'})
}
module.exports = userCtrl