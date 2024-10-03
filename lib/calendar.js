
export const getWeekDays = (
  totalDaysinMonth,
  numericalStartDay
) => {
  // Assumes every month starts on the first
  // Every week must include 7 days
  // The start day number passed in refers to numerical day of the week
  let weeks = [];
  let week = [];
  let weekdayCount = 0;
  for (let i = 1; i <= totalDaysinMonth; i++) {
    if (numericalStartDay > weekdayCount) {
      // Pushes day placholder into week array for weeks days
      // that do no exist in week ( i.e. week starts on Wednesday)
      i = 0;
      week.push(0);
      weekdayCount++;
    } else {
      week.push(i);
    }
    if (
      week.length === 7 ||
      (i === totalDaysinMonth && numericalStartDay < 7)
    ) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
};

export const getCalendarMonth = (dateRequested) => {
  let dateRequestedObj = new Date(dateRequested);
  let numericalMonth = dateRequestedObj.getMonth();
  let monthName = dateRequestedObj.toLocaleString("default", {
    month: "long"
  });
  let year = dateRequestedObj.getFullYear();
  let firstDay = new Date(
    dateRequestedObj.getFullYear(),
    dateRequestedObj.getMonth(),
    1
  ).getDay();
  let totalDays = new Date(year, numericalMonth + 1, 0).getDate();
  let parsedCalendarMonth = {
    numericalMonth: numericalMonth,
    monthName: monthName,
    weeks: getWeekDays(totalDays, firstDay),
    firstDay: firstDay,
    totalDays: totalDays,
    year: year
  };
  return parsedCalendarMonth;
};

export const getTime = () => {
  const currentTime = new Date();
  return currentTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
};

export const getLocalISO = () => {
  const newDate = new Date();
  const timezone = new Date().getTimezoneOffset() * 60 * 1000;
  const localOffset = newDate - timezone;
  return new Date(localOffset).toISOString().slice(0, 19).replace("T", " ");
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 18) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}


export const formatDateToWP = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const pad = (num) => String(num).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1); 
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}-${month}-${day} 23:59:59`;
}