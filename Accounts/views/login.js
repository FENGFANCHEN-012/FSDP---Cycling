document.querySelector('#loginForm').addEventListener('submit', login);

async function login(e) {
  e.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      window.location.href = '/index.html';
    } else {
      alert(data.message || 'Failed to log in.');
    }
  }
}
