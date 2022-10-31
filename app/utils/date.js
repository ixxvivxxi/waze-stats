const dateFormat = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

const timeFormat = new Intl.DateTimeFormat('ru-RU', {
  hour: 'numeric',
  minute: 'numeric',
});

const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

export { dateFormat, timeFormat, timezoneOffset };
