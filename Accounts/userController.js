const accountModel = require('./userModel');
const bcrypt = require('bcryptjs');
const { validateSignup, validateLogin } = require('./userValidation');

module.exports = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const validation = validateSignup(req.body);

    if (validation.error)
      return res.status(400).json({ message: validation.error });

    try {
      const exists = await accountModel.checkUserExists(email);
      if (exists)
        return res.status(400).json({ message: 'Email already exists' });

      await accountModel.createUser(name, email, password);
      res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const validation = validateLogin(req.body);

    if (validation.error)
      return res.status(400).json({ message: validation.error });

    try {
      const user = await accountModel.getUserByEmail(email);
      if (!user)
        return res.status(400).json({ message: 'Invalid email or password' });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: 'Invalid email or password' });

      res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
