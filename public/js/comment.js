const newComment = async (event) => {
    event.preventDefault();
    console.log('start posting comment')
    const content = document.querySelector('.thread-textarea').value.trim();
    const addForm = document.querySelector('.thread-btn');
    const post_id = addForm.dataset.postid;
    console.log('form button post_id', post_id);
    if (content && post_id) {
      const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id: Number(post_id) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to create comment!');
      };
    };
};



document
    .querySelector('.thread-btn')
    .addEventListener('submit', newComment);