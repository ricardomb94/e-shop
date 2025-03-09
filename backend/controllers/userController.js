import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @ccess Public: no token needed
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //We are going to await and take our User Model and
  //find one document by email
  const user = await User.findOne({ email }).select("+password");

  if(!user) {
    res.status(401);
    throw new Error("Email invalide");
  }

  //Here we check if user exist and also if the password
  //that sent matches that user's password in db
  const isMatch = await user.matchPassword(password);
  if(!isMatch) {
    res.status(401);
    throw new Error("Mot de passe invalide");
  }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
});

// @desc Register a new user
// @route POST /api/users
// @ccess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Cet utilisateur existe déja");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Données utilisateur invalides");
  }
});

// @desc GET user profile
// @route GET /api/users/profile
// @ccess Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('name email isAdmin -_id')
    .lean();

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @ccess Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password ? req.body.password : undefined
      }
    },
    { new: true, runValidators: true }
  );

  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



// @route GET /api/users
// @ccess Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc  Delete user
// @route DELETE /api/users/:id
// @ccess Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const result = await User.deleteOne({ _id: req.params.id });
  if (result.deletedCount > 0) {
    res.json({ message: "Utilisateur supprimé avec succès" });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
  console.log(object)
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
