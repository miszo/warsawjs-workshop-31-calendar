const dayjs = require('dayjs');

function buildCalendar(month) {
  const from = dayjs(month)
    .startOf('month')
    .startOf('week');

  const calendarWidth = 7;
  const calendarHeight = 6;
  return Array.from({ length: calendarWidth * calendarHeight }).map((_, index) =>
    from.add(index + 1, 'day').toString()
  );
}

function getDaysRange(date) {
  const start = dayjs(date)
    .startOf('day')
    .format('YYYY-MM-DDTHH:mm');
  const end = dayjs(date)
    .endOf('day')
    .format('YYYY-MM-DDTHH:mm');
  return { start, end };
}

module.exports = {
  buildCalendar,
  getDaysRange
};
