import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        age:{
            type: Number,
            required: true,
            trim: true,
        }
    },
    { timestamps: true }
);
export const User = mongoose.model("User", userSchema);