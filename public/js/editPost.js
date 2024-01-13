const editFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    const postId = document.querySelector('#current-post').getAttribute('data-id');
    console.log(postId);
  
    if (name && description) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Blog post edited successfully!');
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to edit blog post');
      }
    }
  };
  
  document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);