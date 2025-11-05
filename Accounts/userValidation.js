module.exports = {
  validateSignup: ({ name, email, password }) => {
    if (!name || !email || !password) return { error: 'All fields are required' };
    if (password.length < 6) return { error: 'Password must be at least 6 characters' };
    return { error: null };
  },

  validateLogin: ({ email, password }) => {
    if (!email || !password) return { error: 'All fields are required' };
    return { error: null };
  }
};
