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
    // Start date 15 days before the start of the month
    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    startDate.setDate(startDate.getDate() - 15);

    // End date 15 days after the end of the month
    const endDate = new Date(Date.UTC(year, month + 1, 0, 0, 0, 0));
    endDate.setDate(endDate.getDate() + 15);

    try {
      const query = {
        startTime: {
          $gte: startDate,
          $lt: endDate,
        },
      };
      const cursor = await TimeSlots.find(query);
      const slots = await cursor.toArray();

      return slots;
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
