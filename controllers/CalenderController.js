const dailySlots = {
  "2024-04-15": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": true },
  ],
  "2024-04-16": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-20": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-21": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-22": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-23": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-24": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-25": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-26": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-27": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-28": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-04-29": [
    { "09:00-09:45": false },
    { "10:00-10:45": false },
    { "11:00-11:45": false },
    { "12:00-12:45": false },
    { "13:00-13:45": false },
    { "14:00-14:45": false },
    { "15:00-15:45": false },
    { "16:00-16:45": false },
  ],
  "2024-05-05": [
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

let calendarSchedule = {
  2024: {
    // Year level
    "03": {
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
      31: {
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
    },
    "04": {
      // Month level, 04 for April
      "01": {
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
      "02": {
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
          {
            startTime: "17:00",
            endTime: "18:00",
            isBooked: false,
            details: {},
          },
        ],
      },
    },
  },
};

class CalendarController {
  static addEvent(req, res) {}

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static getEventsByMonth(req, res) {
    console.log("Getting slots for the month...");
    try {
      const requestDate = new Date(req.params.date);
      const startDate = new Date(requestDate);
      startDate.setDate(startDate.getDate() - 30); // 30 days before the request date

      const endDate = new Date(requestDate);
      endDate.setDate(endDate.getDate() + 30); // 30 days after the request date

      const filteredSlots = Object.keys(dailySlots)
        .filter((date) => {
          const slotDate = new Date(date);
          return slotDate >= startDate && slotDate <= endDate;
        })
        .reduce((accumulator, date) => {
          // Filter slots to include only those with false values
          const falseSlots = dailySlots[date].filter(
            (slot) => Object.values(slot)[0] === false
          );
          if (falseSlots.length > 0) {
            accumulator[date] = falseSlots;
          }
          return accumulator;
        }, {});
      console.log(filteredSlots);
      return res.status(200).json({ filteredSlots });
    } catch (error) {
      res.status(500).send("Error processing request");
    }
  }

  static async getEventsByDate(req, res) {
    const date = req.params.day; // Make sure your route is set up to pass this param
    console.log(`Getting slots for ${date}...`);

    const slots = dailySlots[date]; // Directly accessing the slots for brevity
    console.log(slots);
    if (slots) {
      console.log(`Slots for ${date}:`, slots);
      return res.status(200).json({
        slots,
      }); // Simplified response
    } else {
      console.log(`No slots available for ${date}.`);
      return res.status(404).json({
        message: `No slots available for ${date}.`,
        slots: [],
      });
    }
  }
  static updateEvent(req, res) {}
}

module.exports = CalendarController;
