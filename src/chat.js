export function sendMessageToChat(userID, message, job, company, requirements, questions) {
  return fetch('http://localhost:3001/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: userID,
      message: message,
      job: job,
      company: company,
      requirements: requirements,
      questions: questions
    }),
  })
  .then(response => response.json())
  .then(data => {
      if (data) {            
          console.log(data);
          return data;
      } else {
          console.log('No data found');
          return null;
      }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

export function gradeResponse(userID, response) {
  return fetch('http://localhost:3001/grade', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: userID,
      response: response,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data) {
      console.log(data);
      return data;
    } else {
      console.log('No grading feedback found');
      return null;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}