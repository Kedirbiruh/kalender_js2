
let today = new Date();
let todayDay = today.getDate();

let todayDayFormatted;
if (todayDay < 10) {
    todayDayFormatted = '0' + todayDay;
} else {
    todayDayFormatted = todayDay;
}

let month = today.getMonth();
let todayMonthFormatted;
if (month + 1 < 10) {
    todayMonthFormatted = '0' + (month + 1);
} else {
    todayMonthFormatted = month + 1;
}

let todayYear = today.getFullYear();
let todayDateFormatted = todayDayFormatted + '.' + todayMonthFormatted + '.' + todayYear;

document.getElementById("fullDate1").textContent = todayDateFormatted;
document.getElementById("fullDate2").textContent = todayDateFormatted;
document.title = "Kalender" + todayDateFormatted;

let weekdaysIndex = today.getDay();
console.log('weekdaysIndex: ' + weekdaysIndex);

let weekday;
if (weekdaysIndex === 0) {
    weekday = 'Sonntag';
} else if (weekdaysIndex === 1) {
    weekday = 'Montag';
} else if (weekdaysIndex === 2) {
    weekday = 'Dienstag';
} else if (weekdaysIndex === 3) {
    weekday = 'Mittwoch';
} else if (weekdaysIndex === 4) {
    weekday = 'Donnerstag';
} else if (weekdaysIndex === 5) {
    weekday = 'Freitag';
} else {
    weekday = 'Samstag';
}

console.log('weekday: ' + weekday);
document.getElementById('fullWeekday1').textContent = weekday;
document.getElementById('fullWeekday2').textContent = weekday;

let monthGerman;
if (month === 0) {
    monthGerman = 'Januar';
} else if (month === 1) {
    monthGerman = 'Februar';
} else if (month === 2) {
    monthGerman = 'März';
} else if (month === 3) {
    monthGerman = 'April';
} else if (month === 4) {
    monthGerman = 'Mai';
} else if (month === 5) {
    monthGerman = 'Juni';
} else if (month === 6) {
    monthGerman = 'Juli';
} else if (month === 7) {
    monthGerman = 'August';
} else if (month === 8) {
    monthGerman = 'September';
} else if (month === 9) {
    monthGerman = 'Oktober';
} else if (month === 10) {
    monthGerman = 'November';
} else {
    monthGerman = 'Dezember';
}

console.log('monthGerman: ' + monthGerman);
document.getElementById('fullMonth').textContent = monthGerman;

const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

for (let i = 0; i < 12; i++) {
    const days = getDaysInMonth(todayYear, i);
    console.log(monthNames[i] + ": " + days + " Tage");
}

let daysInMonth = getDaysInMonth(todayYear, month);
document.getElementById('daysInMonth').textContent = daysInMonth;
document.getElementById('monthName').textContent = monthNames[month];


function getNthWeekdayInMonth(date) {
    const weekdaysIndex = date.getDay();
    const dayOfMonth = date.getDate();
    let count = 0;

    for (let d = 1; d <= dayOfMonth; d++) {
        let current = new Date(date.getFullYear(), date.getMonth(), d);
        if (current.getDay() === weekdaysIndex) {
            count++;
        }
    }

    let ordinal;
    if (count === 1) {
        ordinal = 'erste';
    } else if (count === 2) {
        ordinal = 'zweite';
    } else if (count === 3) {
        ordinal = 'dritte';
    } else if (count === 4) {
        ordinal = 'vierte';
    } else {
        ordinal = 'fünfte';
    }
    return ordinal;
}


let nthWeekday = getNthWeekdayInMonth(today);
document.getElementById('nthWeekday').textContent = nthWeekday;

console.log(`Heute ist der ${nthWeekday}. ${weekday} im Monat ${monthGerman}`);


const feiertage = [
    { monat: 0, tag: 1, name: "Neujahr" },
    { monat: 4, tag: 1, name: "Tag der Arbeit" },
    { monat: 9, tag: 3, name: "Tag der Deutschen Einheit" },
    { monat: 11, tag: 25, name: "1. Weihnachtstag" },
    { monat: 11, tag: 26, name: "2. Weihnachtstag" }
];


let istFeiertag = false;
let feiertagsName = "";

for (let f of feiertage) {
    if (f.monat === today.getMonth() && f.tag === today.getDate()) {
        istFeiertag = true;
        feiertagsName = f.name;
        break;
    }
}

if (istFeiertag) {
    document.getElementById("holiday").textContent = `Heute ist ein gesetzlicher Feiertag in Hessen: ${feiertagsName}.`;
} else {
    document.getElementById("holiday").textContent = "Heute ist kein gesetzlicher Feiertag in Hessen.";
}




function renderCalenderStart(renderYear, renderMonth) {     // funktion to render days

    document.getElementById("kalenderHeader").textContent = `${monthGerman} ${renderYear}`;
    // document.getElementById("kalenderHeader").textContent = monthGerman + ' ' + renderYear;

    const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let firstDay = new Date(renderYear, renderMonth, 1); // um herauszufinden, auf welchen Wochentag der 1. Tag des Monats fällt
    let startDay = (firstDay.getDay() + 6) % 7;         // um Sonntag=6, Montag=0 zu bekommen
    const daysInMonth = new Date(renderYear, renderMonth + 1, 0).getDate(); // um herauszufinden, wie viele Tage der aktuelle Monat hat
    const daysInLastMonth = new Date(renderYear, renderMonth, 0).getDate();



    const tbody = document.getElementsByTagName("tbody")[0];
    // 6x wochen >> 7x tage
    let dayInCurrentMonth = -startDay;

    // wochen (y bzw vertikal)
    for (let renderWeek = 0; renderWeek < 6; renderWeek++) {
        const row = document.createElement("tr");

        // tage (x bzw horizontal)
        for (let renderWeekDay = 0; renderWeekDay < 7; renderWeekDay++) {
            const cell = document.createElement("td");
            dayInCurrentMonth++;
            if (dayInCurrentMonth <= 0) {
                // Stelle ausgegraut dar
                cell.innerText = dayInCurrentMonth + daysInLastMonth;
                cell.classList.add("ausgrauen");

            } else if (dayInCurrentMonth > daysInMonth) {
                // Stelle ausgegraut dar
                let dayNextMonth = dayInCurrentMonth - daysInMonth;
                // Stelle ausgegraut dar
                cell.innerText = dayNextMonth;
                cell.classList.add("ausgrauen");
            } else {
                // Normale Zelle
                cell.innerText = dayInCurrentMonth;

                if (isToday(renderYear, renderMonth, dayInCurrentMonth)) {
                    cell.classList.add("today");
                }
                if (isAndreSBirthday(renderMonth, dayInCurrentMonth)) {
                cell.classList.add("AndreSBirthday");
                }


            }

            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
}
renderCalenderStart(todayYear, month);






///// HELPER FUNCTIONS ////////


function isToday(year, month, day) {
    const today = new Date();
    return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
    );
}

function isAndreSBirthday(month, day) {
    return month === 7 && day === 6;
}




