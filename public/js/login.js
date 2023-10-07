const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Login successful, display SweetAlert2 success dialog
      Swal.fire({
        title: 'Login Successful!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect the user to the profile page after a short delay
      setTimeout(() => {
        document.location.replace('/vehicles');
      }, 2000);
    } else {
      // Login failed, display SweetAlert2 error dialog
      Swal.fire({
        title: 'Login Failed!',
        text: 'Please check your email and password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Login successful, display SweetAlert2 success dialog
      Swal.fire({
        title: 'Signup Successful!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect the user to the profile page after a short delay
      setTimeout(() => {
        document.location.replace('/vehicles');
      }, 2000);
    } else {
      // Login failed, display SweetAlert2 error dialog
      Swal.fire({
        title: 'Signup Failed!',
        text: 'Please try again..',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);