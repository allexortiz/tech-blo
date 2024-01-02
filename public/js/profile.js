// Function to handle the creation of a new blog
const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  // Check if name and description are provided
  if (name && description) {
    // Send a POST request to the blogs API endpoint
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If successful, redirect the browser to the profile page
    if (response.ok) {
      console.log('Blog post created successfully!');
      document.location.replace('/profile');
    } else {
      // Display an alert with a failure message
      alert('Failed to create blog');
    }
  }
};

// Function to handle the deletion of a blog
const delButtonHandler = async (event) => {
  // Check if the clicked element has a 'data-id' attribute
  if (event.target.hasAttribute('data-id')) {
    // Get the blog id from the 'data-id' attribute
    const id = event.target.getAttribute('data-id');

    // Send a DELETE request to the blogs API endpoint with the specified id
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    // If successful, redirect the browser to the profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // Display an alert with a failure message
      alert('Failed to delete blog');
    }
  }
};

// Adding event listeners to the form submission and delete button click
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  document.querySelector('.blog-list').addEventListener('click', delButtonHandler);