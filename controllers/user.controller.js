const User = require("../models/user.model.js");
const createError = require("../utils/createError.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0, resetToken: 0, resetTokenExpiration: 0 }); // Exclude sensitive fields from the response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId, { password: 0, resetToken: 0, resetTokenExpiration: 0 }); // Exclude sensitive fields from the response

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, deleteUserById };
