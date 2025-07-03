const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendAdminReport } = require('../utils/mailer');


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email уже зарегистрирован' });

    const user = new User({ name, email, password });
    await user.save();

    await sendAdminReport(user);

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;