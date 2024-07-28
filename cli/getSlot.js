const readline = require('readline');
const axios = require('axios');

// Create an interface for reading input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask a question and get the input
const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const main = async () => {
  try {
    // Get input from the user for slot retrieval parameters if necessary
    const slotId = await askQuestion(
      'Enter slot ID (optional, press enter to skip): '
    );

    // Construct the URL
    let url = 'http://localhost:3100/calendar/get-slot';
    if (slotId) {
      url += `/${slotId}`;
    }

    // Make a GET request
    const response = await axios.get(url);

    // Output the result
    console.log('Retrieved slot data:');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
    console.log('Error retrieving slots.');
  } finally {
    // Close the readline interface
    rl.close();
  }
};

// Run the main function
main();
