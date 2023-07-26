const mongoose=require("mongoose");


const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log(`database connected`);
    }).catch(()=>{
        console.log(`failed to connect with database`);
    })
}

module.exports=connectDatabase