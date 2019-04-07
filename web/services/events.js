const { getDaysRange } = require('../helpers/calendar');
const EventModel = require('../../models/event-model');

const createEvent = async (data) => {
  const model = await EventModel.create(data);
  return model._id;
};

const removeEvent = async (id) => {
  await EventModel.deleteOne({ _id: id });
  return id;
};

const updateEvent = async (id, data) => {
  await EventModel.updateOne({ _id: id }, data);
  return id;
};

const getEvents = async (dates) => {
  const results = [];

  for (let date of dates) {
    const events = await getEventsByDate(date);
    results.push({ date, events });
  }

  return results;
};

const getEventsByDate = async (date) => {
  const { start: $gte, end: $lte } = getDaysRange(date);
  const events = await EventModel.find({
    time: { $gte, $lte }
  });

  events.forEach((event) => {
    event.id = event._id;
  });
  return events;
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  removeEvent,
  getEventsByDate
};
