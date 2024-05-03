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

  static async findAvailableDates(year, month) {
    const startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    startDate.setDate(startDate.getDate() - 15);

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
      const dates = await cursor.toArray();
      console.log('dates', dates);
      return dates;
    } catch (err) {
      console.error(`Error retrieving time slots for month: ${err}`);
      return {};
    }
  }

  static async findSlotsByDate(requestDate, userTimeZone) {
    try {
      // Convert the request date from UTC to the user's timezone to determine the correct day
      const localStartOfDay = DateTime.fromISO(requestDate, {
        zone: 'utc',
      })
        .setZone(userTimeZone)
        .startOf('day');

      const localEndOfDay = localStartOfDay
        .plus({ days: 1 })
        .minus({ seconds: 1 });

      // Convert these local times back to UTC for the database query
      const utcStartOfDay = localStartOfDay.toUTC();
      const utcEndOfDay = localEndOfDay.toUTC();

      // Create the query using UTC times
      const query = {
        startTime: {
          $gte: utcStartOfDay.toJSDate(),
          $lt: utcEndOfDay.toJSDate(),
        },
      };

      // Perform the query
      const slots = await TimeSlots.find(query).toArray();

      // Adjust the slot times for display in the user's local timezone
      const adjustedSlots = slots.map((slot) => ({
        ...slot,
        startTime: DateTime.fromJSDate(slot.startTime, {
          zone: 'utc',
        })
          .setZone(userTimeZone)
          .toString(),
        endTime: DateTime.fromJSDate(slot.endTime, { zone: 'utc' })
          .setZone(userTimeZone)
          .toString(),
      }));

      console.log('slots:', slots);
      return slots;
    } catch (err) {
      console.error(`Error retrieving time slots by date: ${err}`);
      return [];
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
