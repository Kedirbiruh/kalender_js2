let today = new Date();
let todayDay = today.getDate();
let todayDayFormatted = todayDay.toString().padStart(2, '0');

let todayMonth = today.getMonth();
let todayMonthFormatted = (todayMonth + 1).toString().padStart(2, '0');

let todayYear = today.getFullYear();
let todayDateFormatted = todayDayFormatted + '.' + todayMonthFormatted + '.' + todayYear;

document.getElementById("fullDate1").textContent = todayDateFormatted;
document.getElementById("fullDate2").textContent = todayDateFormatted;
document.title = "Kalender " + todayDateFormatted;

let weekdaysIndex = today.getDay();
let weekday = getWeekdayGerman(weekdaysIndex);

document.getElementById('fullWeekday1').textContent = weekday;
document.getElementById('fullWeekday2').textContent = weekday;
document.getElementById('fullMonth').textContent = getMonthGerman(todayMonth);

let daysInMonth = getDaysInMonth(todayYear, todayMonth);
document.getElementById('daysInMonth').textContent = daysInMonth;
document.getElementById('monthName').textContent = getMonthGerman(todayMonth);
document.getElementById("currentYear").textContent = todayYear;

let nthWeekday = getNthWeekdayInMonth(today);
document.getElementById('nthWeekday').textContent = nthWeekday;

let feiertagsName = getFeiertag(today);

renderCalenderStart2(todayYear, todayMonth);
if (feiertagsName) {
    document.getElementById("holiday").textContent = `Heute ist ein gesetzlicher Feiertag in Hessen: ${feiertagsName}.`;
} else {
    document.getElementById("holiday").textContent = "Heute ist kein gesetzlicher Feiertag in Hessen.";
}



// HELPER FUNCTIONS //

function getWeekdayGerman(index) {
    const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return weekdayNames[index];
}

function areDatesEqual(datum1, datum2) {
    return datum1.getFullYear() === datum2.getFullYear() && datum1.getMonth() === datum2.getMonth() && datum1.getDate() === datum2.getDate();
}

function getFeiertag(datum) {
    const festeFeiertage = [
        { monat: 0, tag: 1, name: "Neujahr" },
        { monat: 4, tag: 1, name: "Tag der Arbeit" },
        { monat: 9, tag: 3, name: "Tag der Deutschen Einheit" },
        { monat: 11, tag: 25, name: "1. Weihnachtstag" },
        { monat: 11, tag: 26, name: "2. Weihnachtstag" }
    ];
    for (let f of festeFeiertage) {
        if (f.monat === datum.getMonth() && f.tag === datum.getDate()) {
            return f.name;
        }
    }
    // Jetzt prüfen wir die beweglichen Feiertage
    const himmelFahrt = getHimmelfahrt(datum.getFullYear());
    const pfingsten = getPfingsten(datum.getFullYear());
    const karfreitag = getKarfreitag(datum.getFullYear());
    const ostermontag = getOstermontag(datum.getFullYear());
    const fronleichnam = getFronleichnam(datum.getFullYear());

    if (areDatesEqual(datum, himmelFahrt)) {
        return "Himmelfahrt";
    } else if (areDatesEqual(datum, pfingsten)) {
        return "Pfingsten";
    } else if (areDatesEqual(datum, karfreitag)) {
        return "Karfreitag";
    } else if (areDatesEqual(datum, ostermontag)) {
        return "Ostermontag";
    } else if (areDatesEqual(datum, fronleichnam)) {
        return "Fronleichnam";
    }
    return false;
}


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
    return new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 39);
}

// Berechnung von Pfingsten anhand von Ostersonntag:
function getPfingsten(year) {
    const easterSunday = getEasterSunday(year);
    return new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 49);
}

// Berechnung von Karfreitag anhand von Ostersonntag:
function getKarfreitag(year) {
    const easterSunday = getEasterSunday(year);
    return new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() - 2);
}

// Berechnung von  anhand von Ostersonntag:
function getOstermontag(year) {
    const easterSunday = getEasterSunday(year);
    return new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 1);
}

// Berechnung von Fronleichnam anhand von Ostersonntag:
function getFronleichnam(year) {
    const easterSunday = getEasterSunday(year);
    return new Date(easterSunday.getFullYear(), easterSunday.getMonth(), easterSunday.getDate() + 60);
}


function renderCalenderStart2(renderYear, renderMonth) {     // funktion to render days
    document.getElementById("kalenderHeader").textContent = `${getMonthGerman(todayMonth)} ${todayYear}`;
    let firstDay = new Date(renderYear, renderMonth, 1); // um herauszufinden, auf welchen Wochentag der 1. Tag des Monats fällt
    let daysOfLastMonth = (firstDay.getDay() + 6) % 7;          // um Sonntag=6, Montag=0 zu bekommen
    let startDay = new Date(renderYear, renderMonth, 1 - daysOfLastMonth);
    let lastDay = new Date(renderYear, renderMonth + 1, 0); // um herauszufinden, wie viele Tage der aktuelle Monat hat
    let daysInNextMonth = (7 - lastDay.getDay()) % 7;
    let endDay = new Date(renderYear, renderMonth, lastDay.getDate() + daysInNextMonth);
    let tbody = document.getElementById('tableBody');
    let row;
    for (let day = startDay; day <= endDay; day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)) {
        let weekday = day.getDay();
        // Montags wird die TableRow eröffnet
        if (weekday === 1) {
            row = document.createElement("tr");
        }
        // Zelle
        let cell = document.createElement("td");
        cell.innerText = day.getDate();
        if (day.getMonth() !== renderMonth) {
            cell.classList.add("offsets");
        }
        if (isToday2(day)) {
            cell.classList.add("today");
        }
        if (isAndreBirthday(day.getMonth(), day.getDate())) {
            cell.classList.add("Andre’sBirthday");
        }
        if (getFeiertag(day)) {
            cell.classList.add("feiertag");
        }
        if (weekday == 6) {
            cell.classList.add("samstag");
        } else if (weekday == 0) {
            cell.classList.add("sonntag")
        }
        // Table Row abschließen
        row.appendChild(cell);
        if (weekday === 0) {
            tbody.appendChild(row);
            row = undefined;
        }
    }

}

function getMonthGerman(month) {
    const monthNames = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    return monthNames[month];
}

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
}

function getNthWeekdayInMonth2(date) {
    const dayOfMonth = date.getDate();
    if (dayOfMonth < 8) return 'erster';
    if (dayOfMonth < 15) return 'zweiter';
    if (dayOfMonth < 22) return 'dritter';
    if (dayOfMonth < 29) return 'vierter';
    return 'fünfter';
}

function getNthWeekdayInMonth3(date) {
    const dayOfMonth = date.getDate();
    if (dayOfMonth < 8) return 1;
    if (dayOfMonth < 15) return 2;
    if (dayOfMonth < 22) return 3;
    if (dayOfMonth < 29) return 4;
    return 5;
}

function getNthWeekdayInMonth4(date) {
    const wievielterArray = ['erster', 'zweiter', 'dritter', 'vierter', 'fünfter'];
    return wievielterArray[Math.floor((date - 1) / 7)];
}

function isToday(year, month, day) {
    const today = new Date();
    return (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
    );
}

function isToday2(datum) {
    const today = new Date();
    return (
        today.getFullYear() === datum.getFullYear() &&
        today.getMonth() === datum.getMonth() &&
        today.getDate() === datum.getDate()
    );
}

function isAndreBirthday(month, day) {
    return month === 7 && day === 6;
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}











