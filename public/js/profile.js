const newFormHandler = async (event) => {
  event.preventDefault();

  const idea = document.querySelector('#idea-text').value.trim();
  // const description = document.querySelector('#idea-text').value.trim();

  if (idea) {
    const response = await fetch(`/api/ideas`, {
      method: 'POST',
      body: JSON.stringify({ idea }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create idea');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/ideas/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete idea');
    }
  }
};

document
  .querySelector('.new-idea-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.idea-list')
  .addEventListener('click', delButtonHandler);
