// Function to handle the creation of a new blog
const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  // Check if name and description are provided
  if (name && description) {
    // Send a POST request to the blogs API endpoint
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title: name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
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
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
    // If successful, redirect the browser to the profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // Display an alert with a failure message
      alert('Failed to delete blog');
    }
    
  }
};

const editFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the edit form
  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  const postId = document.querySelector('#current-post').getAttribute('data-id');

  // Check if name and description are provided
  if (name && description) {
    // Send a PUT request to the API endpoint for editing the post
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If successful, redirect the browser to the updated post
    if (response.ok) {
      console.log('Blog post edited successfully!');
      document.location.replace(`/post/${postId}`);
    } else {
      // Display an alert with a failure message
      alert('Failed to edit blog post');
    }
  }
};

// Adding event listeners to the form submission and delete button click
document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
// Adding an event listener to the edit form
document.querySelector('.blog-list').addEventListener('click', delButtonHandler);
// Adding an event listener to the edit form
document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);