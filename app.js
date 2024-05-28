require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const CalendarController = require("./controllers/CalenderController.js");
const {
  validateIso8601Date,
} = require("./middlewares/validateRequestDateInUtcDateTime.js");
const { InitDBAtlas } = require("./models/initAtlas.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
InitDBAtlas();

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

app.use(express.json());
app.use(express.static("public"));

app.post(
  "/calendar/post-calendar-availability",
  CalendarController.postAvailableDates
);

app.post(
  "/calendar/post-day-appointments",
  validateIso8601Date,
  CalendarController.postDayAppointments
);

app.get(
  "/calendar/add-appointment/:startTime/:endTime/:durationMinutes/:overlapMinutes",
  CalendarController.addAppointment
);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
