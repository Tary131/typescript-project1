// routes/authRoute.js
import express from 'express';
import {registerUser, loginUser, getUser} from '../controllers/userController/userController.js';
import {tokenCheck} from "../utils/tokenCheck.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', tokenCheck, getUser);


export default router;
