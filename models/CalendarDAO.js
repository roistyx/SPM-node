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
