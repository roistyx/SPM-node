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
    // Get input from the user
    const startTime = await askQuestion(
      'Enter start time (e.g. 2024-07-29T17:00): '
    );
    const endTime = await askQuestion(
      'Enter end time (e.g. 2024-07-29T23:00): '
    );

    const durationMinutes = 30;
    const overlapMinutes = 15;

    // Construct the URL
    const url = `http://localhost:3100/calendar/add-appointment/${startTime}/${endTime}/${durationMinutes}/${overlapMinutes}`;

    // Make a GET request
    const response = await axios.get(url);

    // Output the result
    console.log(`Slots added for ${startTime} and ${endTime}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
    console.log('Error adding slots.');
  } finally {
    // Close the readline interface
    rl.close();
  }
};

// Run the main function
main();
