const CalendarDAO = require("../models/CalendarDAO.js");
const moment = require("moment-timezone");

const dailySlots = {
  "24-04-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": true },
  ],
  "25-04-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "28-04-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "29-04-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "30-04-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "03-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "04-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "05-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "06-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "07-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "10-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "11-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "12-05-2024": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": true },
  ],
};

let calendar = {
  2024: {
    // Year level
    "04": {
      // Month level, 03 for March
      29: {
        // Day level
        day: "Friday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {}, // Details for the time slot
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: true,
            details: {
              /* Booking details */
            },
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
      30: {
        day: "Saturday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
    },
    "05": {
      "01": {
        day: "Sunday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
      "02": {
        day: "Monday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
      "03": {
        day: "Tuesday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
      "04": {
        day: "Wednesday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "10:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "10:00",
            endTime: "11:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "11:00",
            endTime: "12:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "12:00",
            endTime: "13:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "13:00",
            endTime: "14:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "14:00",
            endTime: "15:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "15:00",
            endTime: "16:00",
            isBooked: false,
            details: {},
          },
          {
            startTime: "16:00",
            endTime: "17:00",
            isBooked: false,
            details: {},
          },
        ],
      },
    },
  },
};

class CalendarController {
  static async addAppointment(req, res) {
    const { startTime, endTime, durationMinutes, overlapMinutes } = req.params;

    // console.log(
    //   `Adding slots from ${UtcStartTime} to ${UtcEndTime} with duration ${durationMinutes} and overlap ${overlapMinutes}`
    // );

    const UtcStartTime = new Date(startTime);
    const UtcEndTime = new Date(endTime);

    let slots = [];
    for (let current = new Date(UtcStartTime); current < UtcEndTime; ) {
      let slotStart = new Date(current);
      let slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000);

      const startTimeNY = moment(slotStart)
        .tz("America/New_York")
        .format("h:mm A");
      const endTimeNY = moment(slotEnd).tz("America/New_York").format("h:mm A");
      const dateNY = moment(slotStart)
        .tz("America/New_York")
        .format("MMMM D, YYYY");

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
      console.error("Error adding time slots", error);
    }
  }

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static async displayAllTimeSlots(req, res) {
    const requestDate = new Date(req.body.navigationDate);
    const year = requestDate.getFullYear();
    const month = requestDate.getMonth();

    try {
      const slotsAvailability = await CalendarDAO.getSlotsByMonth(year, month);
      res.status(200).json(slotsAvailability);
    } catch (error) {
      console.error("Error getting time slots for month:", error);
      res.status(500).send("Error processing request");
    }
  }

  static async getEventsByDate(req, res) {
    const requestDate = new Date(req.body.navigationDate);
    console.log("requestDate", requestDate);

    return res.status(200).json(requestDate);
  }
  static updateEvent(req, res) {}
}

module.exports = CalendarController;
