require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const CalendarController = require('./controllers/CalenderController.js');
// const ImageController = require("•/controllers/ImageController");
const { InitDBAtlas } = require('./models/initAtlas.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
InitDBAtlas();

app.use(express.static(path.join(__dirname, 'public')));

// InitDBAtlas();

app.use(express.json());
app.use(express.static('public'));

app.get(
  '/calendar/get-day-appointments/:day',
  CalendarController.getEventsByDate
);

app.get(
  '/calendar/get-month-appointments/:date',
  CalendarController.getEventsByMonth
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
