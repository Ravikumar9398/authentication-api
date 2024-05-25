const mongoose = require("mongoose")

const config = async () => {
    try {
        await mongoose
        .connect("mongodb+srv://ravikumar:ravi123@cluster0.zeycrnj.mongodb.net/")
        .then(()=> {
            console.log("db connected")
        })
       
    } catch (error){
        console.log({
        message : error.message
          
        })
      
    }
}

config()