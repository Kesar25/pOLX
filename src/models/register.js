const mongoose=require("mongoose");

const studentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: String,
        required: true
    }
})

const Register=new mongoose.model("Register",studentSchema);
module.exports=Register