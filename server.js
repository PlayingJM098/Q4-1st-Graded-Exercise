const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000; // Change if needed

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (like CSS)

// Set Handlebars as the template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Ensure .hbs files are inside "views" folder

// Route for Home Page
app.get('/', (req, res) => {
  res.render('index');
});

// Route to Handle Form Submission
app.post('/happy', (req, res) => {
  const { name, gender, number, ...participants } = req.body;

  let participantNames = [];

  // Extract participant names and attendance (checkbox values)
  for (let i = 1; i <= number; i++) {
    let participantName = participants[`name${i}`] || `Guest ${i}`;
    let isGoing = participants[`checkbox${i}`] ? 'Yes' : 'No';

    participantNames.push({ name: participantName, going: isGoing });
  }

  // Ensure at least 4 participants for the song
  while (participantNames.length < 4) {
    participantNames.push({
      name: `Guest ${participantNames.length + 1}`,
      going: 'No',
    });
  }

  // Generate Happy Birthday Song Lyrics using participant names
  const songLines = [
    `${participantNames[0].name}: Happy`,
    `${participantNames[1].name}: birthday`,
    `${participantNames[2].name}: to`,
    `${participantNames[3].name}: you!`,
    `${participantNames[0].name}: Happy`,
    `${participantNames[1].name}: birthday`,
    `${participantNames[2].name}: dear`,
    `${name}.`,
    `${participantNames[0].name}: Happy`,
    `${participantNames[1].name}: birthday`,
    `${participantNames[2].name}: to`,
    `${participantNames[3].name}: you!`,
    `${participantNames[0].name}: For, he/she's a jolly good fellow, which nobody can deny!`,
  ];

  // Render "happy.hbs" with user data
  res.render('happy', {
    name,
    gender,
    number,
    participants: participantNames,
    songLines,
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
