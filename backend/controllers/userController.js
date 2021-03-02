import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModels.js';


// @desc Auth user & get token
// @route POST /api/users/login
// @ccess Public: no token needed
const authUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Email ou mot de passe invalide')
    }
})

// @desc GET user profile
// @route GET /api/users/profile
// @ccess Private
const getUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id)

    if(user){
            res.json({_id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin})
    }else{
        res.status(404)
    }
})
 
export { authUser, getUserProfile }