const CalendarDAO = require('../models/CalendarDAO.js');
const moment = require('moment-timezone');

class CalendarController {
  static async addAppointment(req, res) {
    const { startTime, endTime, durationMinutes, overlapMinutes } =
      req.params;

    // console.log(
    //   `Adding slots from ${UtcStartTime} to ${UtcEndTime} with duration ${durationMinutes} and overlap ${overlapMinutes}`
    // );

    const UtcStartTime = new Date(startTime);
    const UtcEndTime = new Date(endTime);

    let slots = [];
    for (
      let current = new Date(UtcStartTime);
      current < UtcEndTime;

    ) {
      let slotStart = new Date(current);
      let slotEnd = new Date(
        slotStart.getTime() + durationMinutes * 60000
      );

      const startTimeNY = moment(slotStart)
        .tz('America/New_York')
        .format('h:mm A');
      const endTimeNY = moment(slotEnd)
        .tz('America/New_York')
        .format('h:mm A');
      const dateNY = moment(slotStart)
        .tz('America/New_York')
        .format('MMMM D, YYYY');

      slots.push({
        startTime: slotStart,
        endTime: slotEnd,
        isBooked: false,
        details: {},
        NewYorkTime: `${startTimeNY} to ${endTimeNY} on ${dateNY}`,
      });

      // Move to next start time considering the overlap
      current = new Date(
        current.getTime() + (durationMinutes - overlapMinutes) * 60000
      );
    }
    try {
      const response = await CalendarDAO.addSlot(slots);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error adding time slots', error);
    }
  }

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static async postAvailableDates(req, res) {
    const requestDate = new Date(req.body.navigationDate);
    const userTimeZone = req.body.timeZone;
    ``;
    const year = requestDate.getFullYear();
    const month = requestDate.getMonth();

    function convertToUserTime(dates) {
      return dates.map((date) => {
        const userStartTime = moment(date.startTime)
          .tz(userTimeZone)
          .format();
        const userEndTime = moment(date.endTime)
          .tz(userTimeZone)
          .format();

        return {
          ...date,
          startTime: userStartTime,
          endTime: userEndTime,
        };
      });
    }
    function createAvailableDatesObj(updatedDates) {
      const now = moment().tz(userTimeZone); // Get the current time in the user's timezone
      const availableDatesObj = {}; // Use an object to store dates

      updatedDates.forEach((date) => {
        const newStartTime = moment(date.startTime);
        if (newStartTime.isAfter(now, 'day')) {
          // Only include slots that are in the future
          const formattedDate = newStartTime.format('YYYY-MM-DD'); // Extract the date part
          availableDatesObj[formattedDate] = true; // Set the date as a key in the object with the value true
        }
      });

      return availableDatesObj;
    }

    try {
      const dates = await CalendarDAO.findAvailableDates(year, month);
      const updatedDates = convertToUserTime(dates);

      return res
        .status(200)
        .json(createAvailableDatesObj(updatedDates));
    } catch (error) {
      console.error('Error getting time slots for month:', error);
      res.status(500).send('Error processing request');
    }
  }

  static async postDayAppointments(req, res) {
    const requestDate = req.body.requestDateInUtcDateTime;
    console.log('Request date:', requestDate);
    try {
      const slotsByDate = await CalendarDAO.findSlotsByDate(
        requestDate
      );

      return res.status(200).json(slotsByDate);
    } catch (error) {
      console.error('Error getting time slots for date:', error);
      res.status(500).send('Error processing request');
    }
  }

  static updateEvent(req, res) {}
}

module.exports = CalendarController;
