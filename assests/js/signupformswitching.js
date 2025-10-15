// This script handles the switching between different pages in the signup and login process.
  document.getElementById('go-to-login').onclick = () => {
    togglePages('login-page');
  };

  document.getElementById('go-to-signup').onclick = () => {
    togglePages('signup-page');
  };

  document.getElementById('forgot-password').onclick = () => {
    togglePages('forgot-password-page');
  };

  document.getElementById('back-to-login').onclick = () => {
    togglePages('login-page');
  };

  document.getElementById('back-to-dashboard').onclick = () => {
    togglePages('login-page'); // or redirect to dashboard
  };

  function togglePages(activeId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
  }

