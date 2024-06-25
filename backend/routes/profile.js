const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.put('/profile', auth, async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
