const mongoose=require("mongoose")
require("dotenv").config()


// const connection = mongoose.connect("mongodb://localhost:27017")
const connection = mongoose.connect(process.env.mongoURL)

module.exports={
    connection
}



