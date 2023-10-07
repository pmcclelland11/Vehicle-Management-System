const logout = async () => {
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
  });

  if (isConfirmed) {
    // If the user confirms, proceed with the logout action
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#logout-button').addEventListener('click', logout);
