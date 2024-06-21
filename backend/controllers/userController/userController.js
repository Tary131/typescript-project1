// controllers/userController/userController.js
import { User } from "../../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import { SECRET_KEY } from '../../config.js';




export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }


        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt )
        const newUser= new User(
            {username,
            email,
            password:hash, }
        )

        await newUser.save();

        res.status(201).json({newUser, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt with email:', email); // Debugging
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email); // Debugging
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.log('Password does not match for email:', email); // Debugging
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id },
            SECRET_KEY,
            { expiresIn: "30d" }
        );

        return res.json({ user, token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
 export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user){
            return res.json({
                message:"User not exist"
            })
        }
        const token = jwt.sign(
            {
                id: user._id
            }, SECRET_KEY,
            {expiresIn:"30d"})
        res.json({ user, token});
    }catch (err){
        return res.json({
            message:"User not exist"
        })
    }
};