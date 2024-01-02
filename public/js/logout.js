// Logout function
const logout = async () => {
  // Send a POST request to the logout API endpoint
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to the homepage
    document.location.replace('/');
  } else {
    // Display an alert with the error message
    alert(response.statusText);
  }
};

// Adding an event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);