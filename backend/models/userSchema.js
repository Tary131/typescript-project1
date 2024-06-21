import mongoose from 'mongoose';



const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books"
    }]
},
    {
        timestamps: true,
    });


export const User = mongoose.model('User', userSchema);