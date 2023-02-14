const newFormHandler = async (event) => {
    event.preventDefault();

    const idea = document.querySelector('#project-desc').value.trim();
    // const description = document.querySelector('#project-desc').value.trim();

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

document.querySelector('.new-project-form')
.addEventListener('submit', newFormHandler);