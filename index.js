const express=require("express")
const {connection}=require("./db")
require("dotenv").config()
const {userRouter}=require("./routes/User.routes")


const app=express()

app.use(express.json())
app.use("/users",userRouter)





app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to the DB")
    } catch (error) {
        console.log({ msg: error.message });
        
    }
    console.log(`server is running at port ${process.env.port}`)
})


// app.listen(8080,async()=>{
//     try{
//         await connection;
//         console.log("Connection with db");
//     }catch(err){
//         console.log("server is running at port 8080");
//     }
// })