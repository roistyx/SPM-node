const dailySlots = {
  '24-04-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': true },
  ],
  '25-04-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '28-04-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '29-04-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '30-04-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '03-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '04-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '05-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '06-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '07-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '10-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '11-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': false },
  ],
  '12-05-2024': [
    { '09:00-09:45': false },
    { '10:00-10:45': false },
    { '11:00-11:45': false },
    { '12:00-12:45': false },
    { '13:00-13:45': false },
    { '14:00-14:45': false },
    { '15:00-15:45': false },
    { '16:00-16:45': true },
  ],
};

let calendar = {
  2024: {
    // Year level
    '04': {
      // Month level, 03 for March
      29: {
        // Day level
        day: 'Friday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {}, // Details for the time slot
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: true,
            details: {
              /* Booking details */
            },
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
      30: {
        day: 'Saturday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
    },
    '05': {
      '01': {
        day: 'Sunday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
      '02': {
        day: 'Monday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
      '03': {
        day: 'Tuesday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
      '04': {
        day: 'Wednesday',
        timeSlots: [
          {
            startTime: '09:00',
            endTime: '10:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '11:00',
            endTime: '12:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '12:00',
            endTime: '13:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '13:00',
            endTime: '14:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '14:00',
            endTime: '15:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '15:00',
            endTime: '16:00',
            isBooked: false,
            details: {},
          },
          {
            startTime: '16:00',
            endTime: '17:00',
            isBooked: false,
            details: {},
          },
        ],
      },
    },
  },
};

class CalendarController {
  static addAppointmentTime(req, res) {
    const startTime = new Date('2024-04-24T19:00:00');
    const endTime = new Date('2024-04-24T22:00:00');

    // Time slot details
    const durationMinutes = 30; // Duration of each time slot
    const overlapMinutes = 15; // Overlap between time slots

    let slots = [];
    for (let current = new Date(startTime); current < endTime; ) {
      let slotStart = new Date(current);
      let slotEnd = new Date(
        slotStart.getTime() + durationMinutes * 60000
      );
      slots.push({ startTime: slotStart, endTime: slotEnd });

      // Move to next start time considering the overlap
      current = new Date(
        current.getTime() + (durationMinutes - overlapMinutes) * 60000
      );
    }
  }

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static getEventsByMonth(req, res) {
    console.log('Getting slots for the month...');
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
      res.status(500).send('Error processing request');
    }
  }

  static async getEventsByDate(req, res) {
    console.log('req', req.params.day);

    return;
  }
  static updateEvent(req, res) {}
}

module.exports = CalendarController;
