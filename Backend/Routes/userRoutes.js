
import express from "express";
import User from "../Models/User.js";

const router = express.Router();


// ================= REGISTER =================

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {

        res.status(500).json({
            message: "Registration failed",
            error: err.message
        });

    }

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (user.password !== password) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (err) {

        res.status(500).json({
            message: "Login failed",
            error: err.message
        });

    }

});


// ================= GET USER =================

router.get("/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            user
        });

    } catch (err) {

        res.status(500).json({
            message: "Failed to fetch user",
            error: err.message
        });

    }

});


// ================= UPDATE USER =================

router.put("/:id", async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {

        res.status(500).json({
            message: "Failed to update profile",
            error: err.message
        });

    }

});


export default router;
