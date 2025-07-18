import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Login from "./schema/login.js";

const URL = "mongodb+srv://rafishake6233:GPSewb29ThG1rJEy@cluster0.n2owahs.mongodb.net/LogIn?retryWrites=true&w=majority&appName=Cluster0"; 

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(URL)
    .then(() => { console.log("Connected to MongoDb") })
    .catch((err) => { console.log(err) })


app.post("/create", async (req, res) => {
    const { userName, passWord } = req.body;

    try {
        const newUser = new Login({ userName, passWord });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: "Failed to save user" });
    }
})

app.get("/read", async (req, res) => {
    try {
        const users = await Login.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to save user" });
    }
})

app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { userName, passWord } = req.body;
    try {
        const updatedUser = await Login.findByIdAndUpdate(id, { userName, passWord }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
})

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Login.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});