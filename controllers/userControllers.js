const User = require('../models/User');

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  const { name, mobile, dob, gender, address } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.mobile = mobile || user.mobile;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.address = address || user.address;

    await user.save();
    res.status(200).json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};