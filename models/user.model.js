import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'username required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email:{
        type: String,
        required:[true, 'email required'],
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password:{
        type:String,
        required:[true, 'password daal'],
        unique:true,
        minLength:6,
    },

}, {timestamps:true});
const User =mongoose.model('User', userSchema);
export default user;
