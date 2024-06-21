import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const tokenCheck = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/,"");
    console.log('Token:', token);

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log('Decoded Token:', decoded);
            req.userId = decoded.id;
            next();
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({
                message: "No Access"
            });
        }
    } else {
        console.log('No token provided');
        return res.status(401).json({
            message: "No Token"
        });
    }
};


