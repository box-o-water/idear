const newIdeaFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const idea = document.querySelector('#idea-desc').value.trim();
    // const choiceOne = document.querySelector('#choice-desc-one').value.trim();
    // const choiceTwo = document.querySelector('#choice-desc-two').value.trim();
    // const choiceThree = document.querySelector('#choice-desc-three').value.trim();
    // const choiceFour = document.querySelector('#choice-desc-four').value.trim();
    // const choiceFive = document.querySelector('#choice-desc-five').value.trim();
    
    
      // Send a POST request to the API endpoint
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ idea, choiceOne, choiceTwo, choiceThree, choiceFour, choiceFive}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
  };
  
  document
    .querySelector('#new-idea-form')
    .addEventListener('submit', newIdeaFormHandler);