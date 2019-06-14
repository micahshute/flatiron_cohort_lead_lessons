// CUSTOMIZE THESE VARIABLES

let cohortStartDate = '6/10/19'
let cohortType = 'Part Time'
let day1= 'Tuesday'
let time1 = '6:00 pm'
let day2 = 'Thursday'
let time2 = '6:00 pm'
let zoom = 'https://wework.zoom.us/j/9223879006'

// END CUSTOMIZATION OF VARIABLES


// START AUTONOMOUS SETUP

let cohort = `[${cohortStartDate.split('/').slice(0,2).join('/')} ${cohortType}]`
let cohortStart = new Date(cohortStartDate)


// SET UP COHORT BREAK CALENDAR

let newYears = getHolidayBreak(1,1,cohortStart)
let springBreak = getHolidayBreak(3,31, cohortStart)
let independanceDay = getHolidayBreak(7,4,cohortStart)
let laborDay = getHolidayBreak(9,7,cohortStart)
let aprilBreak = getHolidayBreak(4,30, cohortStart)
// 4th Thursday of the month. Could be the 22nd-27th
// By calculating based on the 24th (which is a saturday if
// the Thursday is the 22nd, or a Monday if the Thursday is 
// the 27th), you will always get the correct break week
let thanksgiving = getHolidayBreak(11, 24, cohortStart)
let christmas = getHolidayBreak(12,25,cohortStart)

cohortBreaks = [
    newYears,
    springBreak,
    aprilBreak,
    independanceDay,
    laborDay,
    thanksgiving,
    christmas
]


// SETUP RELATIVE WEEKS TO CURRENT DATE TO SCHEDULE YOUR 
// STUDY GROUPS

let cliSectionWeeks = Array.from({length: 7}, (v, k) => k+2);

let sinatraSectionWeeks = []
for(i = 9; i <= 16; i++){
    sinatraSectionWeeks.push(i)
}

// GET THE RELATIVE WEEK YOUR COHORT STARTS (CAN BE IN FUTURE OR PAST)
let weekOffset = Math.round((cohortStart - Date.now()) / (7 * 24 * 60 * 60 * 1000))

// MAP THE SECITON'S CURRICULUM TO YOUR COHORT SHEDULE TAKING INTO ACCOUNT BREAK WEEKS AND THE CURRENT DATE
let studygroupWeeks = sinatraSectionWeeks.map(x => (cohortWeekToRelativeWeek(x, cohortStart, cohortBreaks) + weekOffset))






// helper funcitons (should put into class)

// TAKE INTO ACCOUNT BREAK WEEKS TO RELATE CURRICULM SCHEDULE TO ACTUAL WEEKS INTO COHORT
function cohortWeekToRelativeWeek(week, csd, cohortBreaks){
    let breakWeeks = 0
    for(let i = 0; i < week; i++){
        let weekStart = addDays(7 * (i + breakWeeks), csd)
        for(let breakwk of cohortBreaks){
            if(breakwk.getTime() == weekStart.getTime()){
                breakWeeks += 1
                break
            }
        }
    }
    return week + breakWeeks
}

// HELPER METHOD TO ADD DAYS TO A DATE
function addDays(days, date){
    let ndate = new Date(date.getTime())
    ndate.setDate(ndate.getDate() + days)
    return ndate
}

// month, day, cohort start date
// GET START DATE FOR HOLIDAY - SUNDAY GOES TO NEXT MONDAY, EVERYTHING
// ELSE GOES TO PREV MONDDAY
function getHolidayBreak(month, day, csd){
    return vacationMonday(new Date(getYear(month, csd), month - 1, day))
}

// GET THE YEAR OF THE BREAK BASED ON YOUR COHORT START DATE
// IE IF YOU START IN DECEMBER, A JANUARY BREAK WILL BE THE NEXT YEAR
function getYear(month, csd){
    if(csd.getMonth() + 1 <= month){
        return csd.getFullYear()
    }else{
        return csd.getFullYear() + 1
    }
}

// FIND THE MONDAY AS DESCRIBED ABOVE
function vacationMonday(date){
    let ndate = new Date(date.getTime())
    if(ndate.getDay() > 1){
        ndate.setDate(ndate.getDate() - (ndate.getDay() - 1))
    }else if(ndate.getDay() === 0){
        ndate.setDate(date.getDate() + 1)
    }
    return ndate
}



// Generic Sinatra Objects

let sinatraSection = [
    {
        categories: ['What is SQL','SQL Intro and Installation', 'SQL JOINS', 'SQL Database Basics'],
        title: `${cohort} Intro to SQL`,
        description: 'Introduction to SQL',
        day: day1, 
        time: time1,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['What is SQL','SQL Intro and Installation', 'SQL JOINS', 'SQL Database Basics'],
        title: `${cohort} Intro to SQL`,
        description: 'Introduction to SQL',
        day: day2, 
        time: time2,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['ORMs'],
        title: `${cohort} Build an ORM from Scatch`, 
        description: 'Learn how to make SQL work with Ruby',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['ORMs'],
        title: `${cohort} Build an ORM from Scatch`, 
        description: 'Learn how to make SQL work with Ruby',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['ActiveRecord'],
        title: `${cohort} Intro to ActiveRecord`, 
        description: 'Learn the basics of ActiveRecord',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['ActiveRecord'],
        title: `${cohort} Intro to ActiveRecord`, 
        description: 'Learn the basics of ActiveRecord',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Intro to Sinatra`, 
        description: 'Learn the basics of Sinatra',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Intro to Sinatra`, 
        description: 'Learn the basics of Sinatra',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Sinatra REST, MVC, and Forms`, 
        description: 'Learn how to architect projects in Sinatra',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Sinatra REST, MVC, and Forms`, 
        description: 'Learn how to architect projects in Sinatra',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Sinatra CRUD`,
        description: 'Learn Create, Read, Update, and Delete functionality using the Sinatra Framework',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[5], 
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Sinatra Basics'],
        title: `${cohort} Sinatra CRUD`,
        description: 'Learn Create, Read, Update, and Delete functionality using the Sinatra Framework',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[5], 
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Sinatra Project Mode'],
        title: `${cohort} Sinatra Project Prep`,
        description: 'Preparation for your Sinatra Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['Sinatra Project Mode'],
        title: `${cohort} Sinatra Project Prep`,
        description: 'Preparation for your Sinatra Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['Sinatra Project Mode'],
        title: `${cohort} Open Office Hours (Sinatra Portfolio Project)`,
        description: 'Open Office Hours for your Sinatra Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    },
    {
        categories: ['Sinatra Project Mode'],
        title: `${cohort} Open Office Hours (Sinatra Portfolio Project)`,
        description: 'Open Office Hours for your Sinatra Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    }
]