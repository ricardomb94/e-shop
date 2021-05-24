import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModels.js';


// @desc Auth user & get token
// @route POST /api/users/login
// @ccess Public: no token needed
const authUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    //We are going to await and take our User Model and
    //find one document by email
    const user = await User.findOne({email})

    //Here we check if user exist and also if the password 
    //that sent matches that user's password in db
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
        //If user does not exist or password is incorrect
        //We throw an error and return a JSON with status of 401
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
            isAdmin: user.isAdmin
        })
    }else{
        res.status(404)
    }
})

// const getUserProfile = asyncHandler(async (req, res) =>{
//     res.send('Success')
// })



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
 
export { authUser, getUserProfile, registerUser }