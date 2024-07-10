const CalendarDAO = require('../models/CalendarDAO.js');
const moment = require('moment-timezone');
require('dotenv').config();
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');
const axios = require('axios');

class CalendarController {
  static async addAppointment(req, res) {
    const { startTime, endTime, durationMinutes, overlapMinutes } =
      req.params;
    // console.log(
    //   `Adding slots from ${UtcStartTime} to ${UtcEndTime} with duration ${durationMinutes} and overlap ${overlapMinutes}`
    // );
    const UtcStartTime = new Date(startTime);
    const UtcEndTime = new Date(endTime);
    let slots = [];
    for (
      let current = new Date(UtcStartTime);
      current < UtcEndTime;

    ) {
      let slotStart = new Date(current);
      let slotEnd = new Date(
        slotStart.getTime() + durationMinutes * 60000
      );
      const startTimeNY = moment(slotStart)
        .tz('America/New_York')
        .format('h:mm A');
      const endTimeNY = moment(slotEnd)
        .tz('America/New_York')
        .format('h:mm A');
      const dateNY = moment(slotStart)
        .tz('America/New_York')
        .format('MMMM D, YYYY');
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
      console.error('Error adding time slots', error);
    }
  }

  static userSubmitAppointment(req, res) {
    console.log('User submitted appointment', req.body);
  }

  static removeEvent(req, res) {}

  static getAllEvents(req, res) {}

  static async postAvailableDates(req, res) {
    const requestDate = new Date(req.body.navigationDate);
    const userTimeZone = req.body.timeZone;
    ``;
    const year = requestDate.getFullYear();
    const month = requestDate.getMonth();

    function convertToUserTime(dates) {
      return dates.map((date) => {
        const userStartTime = moment(date.startTime)
          .tz(userTimeZone)
          .format();
        const userEndTime = moment(date.endTime)
          .tz(userTimeZone)
          .format();

        return {
          ...date,
          startTime: userStartTime,
          endTime: userEndTime,
        };
      });
    }
    function createAvailableDatesObj(updatedDates) {
      const now = moment().tz(userTimeZone); // Get the current time in the user's timezone
      const availableDatesObj = {}; // Use an object to store dates

      updatedDates.forEach((date) => {
        const newStartTime = moment(date.startTime);
        if (newStartTime.isAfter(now, 'day')) {
          // Only include slots that are in the future
          const formattedDate = newStartTime.format('YYYY-MM-DD'); // Extract the date part
          availableDatesObj[formattedDate] = true; // Set the date as a key in the object with the value true
        }
      });

      return availableDatesObj;
    }

    try {
      const dates = await CalendarDAO.findAvailableDates(year, month);
      const updatedDates = convertToUserTime(dates);

      return res
        .status(200)
        .json(createAvailableDatesObj(updatedDates));
    } catch (error) {
      console.error('Error getting time slots for month:', error);
      res.status(500).send('Error processing request');
    }
  }

  static async postDayAppointments(req, res) {
    const requestDate = req.body.requestDateInUtcDateTime;
    console.log('Request date:', requestDate);
    try {
      const slotsByDate = await CalendarDAO.findSlotsByDate(
        requestDate
      );

      return res.status(200).json(slotsByDate);
    } catch (error) {
      console.error('Error getting time slots for date:', error);
      res.status(500).send('Error processing request');
    }
  }

  static updateEvent(req, res) {}

  static async addressValidation(req, res) {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'Google API key is missing' });
    }

    const { address } = req.body;
    console.log(address);

    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await axios.get(geocodingUrl);
      const { data } = response;

      if (data.status === 'OK') {
        const exactMatches = data.results.filter(
          (result) => result.geometry.location_type === 'ROOFTOP'
        );

        if (exactMatches.length > 0) {
          return res
            .status(200)
            .json({ valid: true, address: exactMatches });
        } else {
          return res
            .status(200)
            .json({ valid: false, suggestions: data.results });
        }
      } else {
        return res.status(400).json({
          valid: false,
          error: data.status,
          message: data.error_message,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Address validation error',
        details: error.message,
      });
    }
  }
}

module.exports = CalendarController;
