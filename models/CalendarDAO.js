// injectDB injects this connection to the database
const { response } = require('express');
const { ObjectId } = require('mongodb');
const { DateTime } = require('luxon');

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

  static async findAvailableDates(requestDate) {
    const startDate = new Date(Date.UTC(requestDate, 1, 0, 0, 0));
    startDate.setDate(startDate.getDate() - 15);

    const endDate = new Date(Date.UTC(requestDate + 1, 0, 0, 0, 0));
    endDate.setDate(endDate.getDate() + 15);
    try {
      const query = {
        startTime: {
          $gte: startDate,
          $lt: endDate,
        },
      };
      const cursor = await TimeSlots.find(query);
      const dates = await cursor.toArray();
      return dates;
    } catch (err) {
      console.error(`Error retrieving time slots for month: ${err}`);
      return {};
    }
  }

  static async findSlotsByDate(requestedDate) {
    // console.log("findSlotsByDate", requestedDate);
    requestedDate = new Date(requestedDate);
    const nextDay = new Date(requestedDate);
    nextDay.setDate(requestedDate.getDate() + 1);

    try {
      // Constructing the query to find slots that start on the specific date
      const query = {
        startTime: {
          $gte: requestedDate,
          $lt: nextDay,
        },
      };

      const results = await TimeSlots.find(query).toArray();
      // console.log("Found documents:", results);
      return results;
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

  static async updateSlot(slot) {
    try {
      const updateResponse = await TimeSlots.updateOne(
        { _id: ObjectId(slot._id) },
        { $set: { isBooked: slot.isBooked } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update slot: ${e}`);
      return { error: e };
    }
  }
};
