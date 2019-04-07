const dayjs = require('dayjs');

function buildCalendar(month) {
  const from = dayjs(dayjs(month).startOf('month').startOf('week').toDate());

  const calendarWidth = 7;
  const calendarHeight = 6;
  return Array
    .from({length: calendarWidth * calendarHeight})
    .map((_, index) => from.add(index + 1, 'day').toString());
}

function buildEvents(dates) {
  return dates.map((date) => ({
    date,
    events: []
  }))
}

module.exports = {
  buildCalendar,
  buildEvents
};
