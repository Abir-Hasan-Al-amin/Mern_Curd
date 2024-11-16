import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const addUser = asyncHandler(async (req, res) => {

    const { email, fname, age } = req.body;
    console.log("email", email);

    if ([fname, email, age].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(309, "User or Email already Exists");
    }

    const user = await User.create({
        fname,
        email,
        age,
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { email, fname, age } = req.body;

    const existingUserWithEmail = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUserWithEmail) {
        throw new ApiError(400, "Email is already in use by another user");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { fname, email, age } },
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
});


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(200).json(new ApiResponse(200, users, "All Users Data"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: userId });

    return res.status(200).json(new ApiResponse(200, user, "Deleted User"));
});

export { addUser,updateUser,getUsers,deleteUser };
