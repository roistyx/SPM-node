// injectDB injects this connection to the database
const { response } = require('express');
const { ObjectId } = require('mongodb');

let TimeSlots;

module.exports = class CalendarDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      TimeSlots = await connection.collection('TimeSlots');

      console.log('Connected to MongoDB TimeSlots collection');
    } catch (err) {
      console.log(
        `Unable to establish a collection handle in CalendarDAO: ${err}`
      );
    }
  }

  static async getSlotsByMonth(year, month) {
    const startDate = new Date(Date.UTC(year, month, 1)); // first day of the month
    const endDate = new Date(Date.UTC(year, month + 1, 1)); // first day of the next month

    try {
      const cursor = await TimeSlots.find({
        startTime: {
          $gte: startDate,
          $lt: endDate,
        },
      }).sort({ startTime: 1 });

      // Initialize daysAvailability with all false values
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get number of days in the month
      const daysAvailability = {};
      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        daysAvailability[formattedDate] = false; // Initially set all days to false
      }

      // Set days to true where time slots are available
      await cursor.forEach((slot) => {
        const date = new Date(slot.startTime);
        const day = date.getUTCDate();
        const formattedDate = `${date.getUTCFullYear()}-${(
          date.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        daysAvailability[formattedDate] = true;
      });

      return daysAvailability;
    } catch (err) {
      console.error(`Error retrieving time slots for month: ${err}`);
      return {};
    }
  }

  static async addSlot(slots) {
    // console.log('addSlot', slots);
    try {
      await TimeSlots.insertMany(slots);
      return { success: true };
    } catch (e) {
      console.error(`Unable to post slot: ${e}`);
      return { error: e };
    }
  }
};
