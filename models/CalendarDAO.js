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
    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));

    try {
      const query = {
        startTime: {
          $gte: startDate,
          $lt: endDate,
        },
      };
      const cursor = await TimeSlots.find(query);
      const slots = await cursor.toArray();

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const availability = {};

      // Initialize all days as false
      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        availability[formattedDate] = false;
      }

      // Set true for days with available slots
      slots.forEach((slot) => {
        const slotDate = new Date(slot.startTime);
        const formattedDate = `${slotDate.getUTCFullYear()}-${(
          slotDate.getUTCMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${slotDate
          .getUTCDate()
          .toString()
          .padStart(2, '0')}`;
        availability[formattedDate] = true;
      });
      //   console.log(availability);

      return availability;
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
