import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userName: String, 
    passWord: String
});
const Login = mongoose.model("Login", loginSchema);
export default Login;