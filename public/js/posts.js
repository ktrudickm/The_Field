const newPost = async (event) => {
    event.preventDefault();
    const description = document.querySelector('.post').value.trim();
    const addPostForm = document.querySelector('.main-post');
    const category_id = addPostForm.dataset.postid;

    if (description && category_id) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ description, category_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create post');
      }
    }
  };

document
  .querySelector('#post-and-comment')
  .addEventListener('submit', newPost);