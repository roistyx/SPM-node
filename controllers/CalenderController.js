const dailySlots = {
  '2024-03-28': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
  '2024-03-27': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
  '2024-03-29': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
  '2024-03-30': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
  '2024-04-01': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
  '2024-04-02': [
    '09:00-09:45',
    '10:00-10:45',
    '11:00-11:45',
    '12:00-12:45',
    '13:00-13:45',
    '14:00-14:45',
    '15:00-15:45',
    '16:00-16:45',
  ],
};

class CalendarController {
  static addEvent(req, res) {}

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static getEventsByMonth(req, res) {
    const month = req.params.month; // Make sure your route is set up to pass this param
    console.log(`Getting slots for ${month}...`);

    const slots = dailySlots[month]; // Directly accessing the slots for brevity
    console.log(slots);
    if (slots) {
      console.log(`Slots for ${month}:`, slots);
      return res.status(200).json({
        slots,
      }); // Simplified response
    } else {
      console.log(`No slots available for ${month}.`);
      return res.status(404).json({
        message: `No slots available for ${month}.`,
        slots: [],
      });
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
