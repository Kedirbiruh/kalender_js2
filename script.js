
let today = new Date(2025, 05);
let day = today.getDate();

let dayFormatted;
if (day < 10) {
    dayFormatted = '0' + day;
} else {
    dayFormatted = day;
}

let month = today.getMonth();
let monthFormatted;
if (month + 1 < 10) {
    monthFormatted = '0' + (month + 1);
} else {
    monthFormatted = month + 1;
}

let year = today.getFullYear();
let dateFormatted = dayFormatted + '.' + monthFormatted + '.' + year;

document.getElementById("fullDate1").textContent = dateFormatted;
document.getElementById("fullDate2").textContent = dateFormatted;
document.title = "Kalender" + dateFormatted;





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
    const days = getDaysInMonth(year, i);
    console.log(monthNames[i] + ": " + days + " Tage");
}


let daysInMonth = getDaysInMonth(year, month);
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









let day = date.getDay(); // 0 (Sonntag) bis 6 (Samstag)
return (day + 6) % 7;    // um Montag = 0 bzw- als erter Tag zu bekommen

const days = ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'];




function renderCalenderStart() {     // funktion to render days


    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();  // letzter Tag d. Monats
    const calendar = document.getElementById("Kalenderblatt");












}

