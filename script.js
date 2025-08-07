
let today = new Date();
let todayDay = today.getDate();

let todayDayFormatted;
if (todayDay < 10) {
    todayDayFormatted = '0' + todayDay;
} else {
    todayDayFormatted = todayDay;
}

let todayMonth = today.getMonth();
let todayMonthFormatted;
if (todayMonth + 1 < 10) {
    todayMonthFormatted = '0' + (todayMonth + 1);
} else {
    todayMonthFormatted = todayMonth + 1;
}

let todayYear = today.getFullYear();
let todayDateFormatted = todayDayFormatted + '.' + todayMonthFormatted + '.' + todayYear;

document.getElementById("fullDate1").textContent = todayDateFormatted;
document.getElementById("fullDate2").textContent = todayDateFormatted;
document.title = "Kalender " + todayDateFormatted;

let weekdaysIndex = today.getDay();

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

document.getElementById('fullWeekday1').textContent = weekday;
document.getElementById('fullWeekday2').textContent = weekday;



document.getElementById('fullMonth').textContent = getMonthGerman(todayMonth);

const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

for (let i = 0; i < 12; i++) {
    const days = getDaysInMonth(todayYear, i);
}

let daysInMonth = getDaysInMonth(todayYear, todayMonth);
document.getElementById('daysInMonth').textContent = daysInMonth;
document.getElementById('monthName').textContent = monthNames[todayMonth];
document.getElementById("currentYear").textContent = todayYear;


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


// Daten für die Feiertage 

const feiertage = [
    { monat: 0, tag: 1, name: "Neujahr" },
    { monat: 4, tag: 1, name: "Tag der Arbeit" },
    { monat: 9, tag: 3, name: "Tag der Deutschen Einheit" },
    { monat: 11, tag: 25, name: "1. Weihnachtstag" },
    { monat: 11, tag: 26, name: "2. Weihnachtstag" }
];

// Berechnung von Ostersonntag nach Gauß:
function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = (h + l - 7 * m + 114) % 31;
  const day = n + 1;
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  return new Date(year, month, day);
}

// Berechnung Christi Himmelfahrt anhand von Ostersonntag:
function getHimmelfahrt(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 39 * 24 * 60 * 60 * 1000);
}
// Berechnung von Pfingsten anhand von Ostersonntag:
function getPfingsten(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 49 * 24 * 60 * 60 * 1000);
}


// Berechnung von Karfreitag anhand von Ostersonntag:
function geKarfreitag(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() - 2 * 24 * 60 * 60 * 1000);
}


// Berechnung von  anhand von Ostersonntag:
function getOstermontag(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 1 * 24 * 60 * 60 * 1000);
}

// Berechnung von Fronleichnam anhand von Ostersonntag:
function getFronleichnam(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 60 * 24 * 60 * 60 * 1000);
}


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

    document.getElementById("kalenderHeader").textContent = `${getMonthGerman(todayMonth)} ${todayYear}`;
    const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let firstDay = new Date(renderYear, renderMonth, 1); // um herauszufinden, auf welchen Wochentag der 1. Tag des Monats fällt
    let startDay = (firstDay.getDay() + 6) % 7;         // um Sonntag=6, Montag=0 zu bekommen
    const daysInMonth = new Date(renderYear, renderMonth + 1, 0).getDate(); // um herauszufinden, wie viele Tage der aktuelle Monat hat
    const daysInLastMonth = new Date(renderYear, renderMonth, 0).getDate(); // Um zu wissen, welche Tage aus dem Vormonat angezeigt werden müssen

    


    // const prevLastDay = new Date(year, month, 0);       // Der letzte Tag des Vormonats
    // const daysInPrevMonth = prevLastDay.getDate();









    const tbody = document.getElementsByTagName("tbody")[0];
    // 6x wochen >> 7x tage
    let dayInCurrentMonth = -startDay;

    // wochen (y bzw. vertikal)
    for (let renderWeek = 0; renderWeek < 6; renderWeek++) {
        const row = document.createElement("tr");

        // tage (x bzw. horizontal)
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
renderCalenderStart(2025, 7);



///// HELPER FUNCTIONS ////////

function getMonthGerman(month) {
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

    return monthGerman;
}

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




