import User from '../models/userModels.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @ccess Public: no token needed
const authUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    //Find the user: let's data from the body
    const user = await User.findOne({email})
    //If the user exist we need to verify if the pw that been sent match the ashed one set in DB
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
        //If the user doesn't exist or the user Pw doesn't match
    }else{
        res.status(401)
        throw new Error('Email ou mot de passe invalide')
    }
})


// @desc Register a new user
// @route POST /api/users
// @ccess Public
const registerUser = asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body

    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('Cet utilisateur existe déja')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Données utilisateur invalides')
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
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
    }
})


// @desc Update user profile
// @route PUT /api/users/profile
// @ccess Private
const updateUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id)

    if(user){
         user.name = req.body.name || user.name
         user.email = req.body.email || user.email
         if(req.body.password){
             user.password = req.body.password
         }

         const updatedUser = await user.save()

         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else{
        res.status(404)
        throw new error('User not found')
    }
})


export { authUser, getUserProfile, registerUser, updateUserProfile }