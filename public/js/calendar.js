// CAlendar functions

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dece"
];
var longMonthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function setCalendar() {
	var today = new Date();
	var calendar = {
		weeks: getMonth(),
		selectedMonth: longMonthNames[today.getMonth()],
        selectedDate: today
	}
	return calendar;
}

// Takes in a JS Date object
function formatDateJS(date) {
	return longMonthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function getMonth() {
	// Get the first day of this month
	var today = new Date();
	var first = new Date(today.getFullYear(), today.getMonth(), 1);
    first = addDate(first, first.getDay()); // Get the first date in calendar

	var month = [];
	for (var i = 0; i < 5; i++) {
		var week = getWeek(first);
		month.push(week);
        first = addDate(first, 7);
	}
	return month;
}

function hasEntries() {
    return false;
}

function getWeek(sunday){
	var today = new Date();
	var date = sunday;
	var week = [];
	for (var i = 0; i < 7; i++) {
		week.push({
			name: formatDateJS(date),
			number: date.getDate(),
			isCurrentMonth: date.getMonth() === today.getMonth(),
            isToday: date.getDate() == today.getDate(),
            date: date,
            hasEntries: hasEntries(date)
		});
		date = addDate(date, 1);
	}
	return week;
}

function addDate(date, value) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + value);
}
