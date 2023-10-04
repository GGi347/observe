function dateToString(year, month, day) {
  let monthFormat = "";
  let dayFormat = "";

  if (month < 10) {
    monthFormat = `0${month}`;
  } else monthFormat = month;

  if (day < 10) {
    dayFormat = `0${day}`;
  } else dayFormat = day;
  return `${year}-${monthFormat}-${dayFormat}`;
}

export { dateToString };
