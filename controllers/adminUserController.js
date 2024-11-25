const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// Get all logged-in users
exports.getLoggedInUsers = async (req, res) => {
  try {
    // Assuming you have a field `isLoggedIn` in your User model
    const users = await User.find({ isLoggedIn: true }).select('-password');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get logged-in users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch logged-in users',
      error: error.message
    });
  }
}; 