const fs = require("fs");
const { writeFileSync } = require("fs");
const { DateTime } = require("luxon");

// ICS Header
let calendar = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

// Daily events (Mon–Sat)
const dailyEvents = [
  { title: "Morning Walk + Exercise", start: "06:30", end: "07:15" },
  { title: "Learning Time (GraphQL/DSA)", start: "07:15", end: "08:15" },
  { title: "Job Applications", start: "09:00", end: "10:30" },
  { title: "Project Work / Portfolio", start: "10:30", end: "13:00" },
  { title: "Deep Work (Project Dev)", start: "14:00", end: "17:00" },
  { title: "Evening Walk", start: "17:00", end: "18:00" },
  { title: "Learning / DSA Practice", start: "18:00", end: "20:00" },
  { title: "Planning + Wind Down", start: "21:00", end: "22:00" },
];

// Sunday events
const sundayEvents = [
  { title: "Weekly Review", start: "10:00", end: "11:00" },
  { title: "Resume + LinkedIn Polish", start: "11:00", end: "12:00" },
  { title: "Next Week Planning", start: "18:00", end: "19:00" },
];

// Format event into ICS
function createEvent(title, start, end) {
  return `BEGIN:VEVENT
SUMMARY:${title}
DTSTART;TZID=Asia/Kolkata:${start}
DTEND;TZID=Asia/Kolkata:${end}
END:VEVENT
`;
}

// Generate events for 30 days
let startDate = DateTime.fromISO("2025-06-13", { zone: "Asia/Kolkata" });
for (let i = 0; i < 30; i++) {
  const date = startDate.plus({ days: i });
  const isSunday = date.weekday === 7;
  const events = isSunday ? sundayEvents : dailyEvents;

  events.forEach((event) => {
    const start = date.set({
      hour: parseInt(event.start.split(":")[0]),
      minute: parseInt(event.start.split(":")[1]),
    });
    const end = date.set({
      hour: parseInt(event.end.split(":")[0]),
      minute: parseInt(event.end.split(":")[1]),
    });
    const formattedStart = start.toFormat("yyyyMMdd'T'HHmmss");
    const formattedEnd = end.toFormat("yyyyMMdd'T'HHmmss");
    calendar += createEvent(event.title, formattedStart, formattedEnd);
  });
}

// Close the calendar
calendar += "END:VCALENDAR";

// Write to .ics file
writeFileSync("Productive_Routine_June_July.ics", calendar);
console.log("✅ Calendar file created: Productive_Routine_June_July.ics");
