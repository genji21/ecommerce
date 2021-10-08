require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload  = require('express-fileupload')
const path = require('path')
const cookieParse = require('cookie-parser')
const Comments = require('./models/commentModel')



const app = express()
app.use(cors())

app.use(express.json())
app.use(cookieParse())
app.use(fileUpload({
    useTempFiles:true
}))

// socket

const http = require('http').createServer(app)
const io = require('socket.io')(http)

let users = []
io.on('connection',socket=>{
    console.log(socket.id + 'connected')
 socket.on('disconnect',()=>{
        console.log(socket.id + 'disconnected')
    })
    // socket.on("joinRoom",id=>{
    //     // const user ={userId: socket.id, room : id}
    //     // console.log(user)
    //     const user = {userId :socket.id,room:id}
    //      const check = users.every(user => user.userId !== socket.id)

    //     if(check){
    //         users.push(user)
    //         socket.join(user.room)
    //     }else{
    //          users.map(user => {
    //            if(user.userId === socket.id){
    //                 if(user.room !== id){
    //                     socket.leave(user.room)
    //                     socket.join(id)
    //                     user.room = id
    //                 }
    //             }
    //         })

    //     }
    //         console.log(users)

    // })







    // socket.on('createComment',async msg=>{
    //     const {username,product_id,rating,values,createAt} = msg
    //     const newComment = new Comments({
    //         username,product_id,rating,content:values,createAt
    //     })
    //     await newComment.save()
    //     io.to(newComment.product_id).emit('sendCommentToClient',newComment)
    // })


   
})
// routers
app.get('/',(req,res)=>{
    res.json({msg:"heelo anh chi em "})
})
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/productRouter'))


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI,err=>{
    if(err) throw err;
    console.log('Connect to  Mongodb');
})
 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(_dirname,'client','build','index.html'))
    })
}
const PORT  = process.env.PORT || 5000
http.listen(PORT,()=>{
    console.log('Server is running a port' , PORT);
})