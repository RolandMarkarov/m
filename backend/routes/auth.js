const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendAdminReport } = require('../utils/mailer');


router.post('/register', async (req, res) => {
  console.log( req.body)
    const { name, email, password, phone } = req.body;
 
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exist' });

    const user = new User({ name, email, password, phone });
    await user.save();

    await sendAdminReport(user);

    res.status(200).json({ message: 'User Registred' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;