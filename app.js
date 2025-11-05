const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Accounts views (login/signup)
app.use('/accounts', express.static(path.join(__dirname, 'Accounts/views')));

// Serve root folder for index.html and other public files
app.use(express.static(path.join(__dirname)));

// Example redirect to login (optional)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Accounts/views/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'Accounts/views/signup.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
