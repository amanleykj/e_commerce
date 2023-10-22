import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    role : String
})

const User = mongoose.User || mongoose.model("User", UserSchema)

export default User;