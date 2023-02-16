// Function handling the posting of a new 'idea'.
const newFormHandler = async (event) => {
  event.preventDefault();

  const idea = document.querySelector('#idea-text').value.trim();
  // const description = document.querySelector('#idea-text').value.trim();
  const choice1 = document.querySelector('#choice-1').value.trim();
  const choice2 = document.querySelector('#choice-2').value.trim();
  const choice3 = document.querySelector('#choice-3').value.trim();
  const choice4 = document.querySelector('#choice-4').value.trim();
  const choice5 = document.querySelector('#choice-5').value.trim();
  
  // Posts new 'idea' data to idea_db.
  if (idea) {
    const response = await fetch(`/api/ideas`, {
      method: 'POST',
      body: JSON.stringify({ idea, choice1, choice2, choice3, choice4, choice5 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log(response.json()); 
      //document.location.replace('/profile');
    } else {
      alert('Failed to create idea');
    }
  }
};

// Function handling the deletion of an 'idea'in the users profile view.
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

// Event handlers for buttons in profile.handlebars.
document
  .querySelector('.new-idea-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.idea-list')
  .addEventListener('click', delButtonHandler);
