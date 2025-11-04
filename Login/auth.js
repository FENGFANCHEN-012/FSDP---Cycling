const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming there's a User model defined
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

// Function to authenticate user and generate JWT   
async function authenticateUser(username, password) {
  const user = await User.findOne({ where: { username } });
    if (!user) {
    throw new Error('Authentication failed: User not found.');
    } 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
    throw new Error('Authentication failed: Incorrect password.');
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return token;
}

async function authenticate(req, res, next) {
  const { username, password } = req.body;
    try {
    const token = await authenticateUser(username, password);
    res.status(200).json({ token });
    } catch (error) {
    res.status(401).json({ message: error.message });
    }
}
module.exports = { authenticate };