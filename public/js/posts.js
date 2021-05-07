const newPost = async (event) => {
    event.preventDefault();
    console.log('start making new post');
    const description = document.querySelector('.post').value.trim();
    const addPostForm = document.querySelector('.main-post');
    const category_id = addPostForm.dataset.postid;
    console.log('after dataset:', category_id, category_id);

    if (description && category_id) {
        console.log('inside if')
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