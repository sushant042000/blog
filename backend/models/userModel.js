const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
 this.password= await bcrypt.hash(this.password,10);
});

userSchema.methods.passwordMatch=function(enteredPassword){
   return bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJwtToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRETE,{
    expiresIn:process.env.JWT_EXPIRE
  })

}

const User = mongoose.model("user", userSchema);

module.exports = User;
