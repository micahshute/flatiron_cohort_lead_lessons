// CUSTOMIZE THESE VARIABLES

let cohortStartDate = '4/15/19'
let cohortType = 'Part Time'
let day1= 'Tuesday'
let time1 = '6:00 pm'
let day2 = 'Thursday'
let time2 = '7:30 am'
let zoom = 'https://wework.zoom.us/j/2135328262'

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

let cliSectionWeeks = Array.from({length: 7}, (v, k) => k + 2);
let sinatraSectionWeeks = Array.from({length: 8}, (v,k) => k + 9)
let railsSectionWeeks = Array.from({length: 8}, (v,k) => k + 17)
let javascriptSectionWeeks = Array.from({length: 8}, (v, k) => k + 25)
let reactSectionWeeks = Array.from({length: 8}, (v,k) => k + 33)
// let sinatraSectionWeeks = []
// for(i = 9; i <= 16; i++){
//     sinatraSectionWeeks.push(i)
// }



// GET THE RELATIVE WEEK YOUR COHORT STARTS (CAN BE IN FUTURE OR PAST)
let weekOffset = Math.floor((cohortStart - Date.now()) / (7 * 24 * 60 * 60 * 1000))

// MAP THE SECITON'S CURRICULUM TO YOUR COHORT SHEDULE TAKING INTO ACCOUNT BREAK WEEKS AND THE CURRENT DATE, USING THE APPROPRIATE SECTION WEEKS
// THIS MUST BE EDITED TO THE SECTION YOU ARE ON
// let studygroupWeeks = railsSectionWeeks.map(x => (cohortWeekToRelativeWeek(x, cohortStart, cohortBreaks) + weekOffset))
// let studygroupWeeks = sinatraSectionWeeks.map(x => (cohortWeekToRelativeWeek(x, cohortStart, cohortBreaks) + weekOffset))
// let studygroupWeeks = javascriptSectionWeeks.map(x => (cohortWeekToRelativeWeek(x, cohortStart, cohortBreaks) + weekOffset))
let studygroupWeeks = reactSectionWeeks.map(x => (cohortWeekToRelativeWeek(x, cohortStart, cohortBreaks) + weekOffset))




// helper funcitons (should put into class)

// TAKE INTO ACCOUNT BREAK WEEKS TO RELATE CURRICULM SCHEDULE TO ACTUAL WEEKS INTO COHORT
function cohortWeekToRelativeWeek(week, csd, cohortBreaks){
    let breakWeeks = 0
    let weeksToCheck = week
    let weekStart
    for(let i = 0; i < weeksToCheck; i++){
        weekStart = addDays(7 * i, csd)
        // console.log("week Start", weekStart)
        for(let breakwk of cohortBreaks){
            if(breakwk.getTime() == weekStart.getTime()){
                breakWeeks += 1
                weeksToCheck += 1
                // console.log('break week found before this week, total:', breakWeeks)
                break
            }
        }
        // console.log('-------------')
    }
    // console.log('realtive week, breakWeekCount', week, breakWeeks)
    return weekStart
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

// Generic CLI Objects

let cliSection = [
    {
        categories: ['Badges and Schedules Lab', 'Sorting Lab', 'Iteration', 'Arrays'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'A live walkthrough of key labs',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Badges and Schedules Lab', 'Sorting Lab', 'Iteration', 'Arrays'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'Q&A about the weeks assignments',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Hashes Manipulation Lab', 'Hashes', 'Nested Hash Iteration'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'A live walkthrough of key labs',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Hashes Manipulation Lab', 'Hashes', 'Nested Hash Iteration'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'Q&A about the weeks assignments',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['OO Cash Register', 'Intro to Object Orientation', 'Object Properties', 'Object Models'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'A live walkthrough of key labs',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['OO Cash Register', 'Intro to Object Orientation', 'Object Properties', 'Object Models'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'Q&A about the weeks assignments',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Collaborating Objects', 'Object Relationships', 'Object Architecture'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'A live walkthrough of key labs',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Collaborating Objects', 'Object Relationships', 'Object Architecture'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'Q&A about the weeks assignments',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Music Library CLI', 'Scraping'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'A live walkthrough of key labs',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Music Library CLI', 'Scraping'],
        title: `${cohort} Hot Potato Lab Walkthrough`,
        description: 'Q&A about the weeks assignments',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['CLI Data Gem Portfolio Project'],
        title: `${cohort} Ruby CLI Project Prep`,
        description: 'Getting started with your CLI project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['CLI Data Gem Portfolio Project'],
        title: `${cohort} Ruby CLI Project Prep`,
        description: 'Getting started with your CLI project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['CLI Data Gem Portfolio Project'],
        title: `${cohort} Open Office Hours (CLI Portfolio Project)`,
        description: 'Organizing your scraped data',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['CLI Data Gem Portfolio Project'],
        title: `${cohort} Open Office Hours (CLI Portfolio Project)`,
        description: 'Organizing your scraped data',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
]

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


// Generic Rails Objects

let railsSection = [
    {
        categories: ['Intro to Rails','Rails MVC'],
        title: `${cohort} Intro to Rails`,
        description: 'Introduction to Ruby on Rails',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Intro to Rails','Rails MVC'],
        title: `${cohort} Intro to RailsL`,
        description: 'Introduction to Ruby on Rails',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Rails MVC', "CRUD with Rails"],
        title: `${cohort} Rails CRUD`,
        description: 'CRUD actions using Ruby on Rails',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Rails MVC', "CRUD with Rails"],
        title: `${cohort} Rails CRUD`,
        description: 'CRUD actions using Ruby on Rails',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Associations and Rails', 'Rails Forms Overview'],
        title: `${cohort} Rails Associations and Nested Forms`,
        description: 'Understand model relations and forms in RoR',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Associations and Rails', 'Rails Forms Overview'],
        title: `${cohort} Rails Associations and Nested Forms`,
        description: 'Understand model relations and forms in RoR',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Layouts and Templates in Rails'],
        title: `${cohort} Refactoring w Layous, Partials, Helpers`,
        description: 'Learn the basics of Sinatra',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Layouts and Templates in Rails'],
        title: `${cohort} Refactoring w Layous, Partials, Helpers`,
        description: 'Learn the basics of Sinatra',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Intro to Rails'],
        title: `${cohort} Routing in Rails - Nested Routes`,
        description: 'Learn about routing and nested routes in RoR',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Intro to Rails'],
        title: `${cohort} Routing in Rails - Nested Routes`,
        description: 'Learn about routing and nested routes in RoR',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Authentication'],
        title: `${cohort} Authentication in Rails`,
        description: 'Learn Create, Read, Update, and Delete functionality using the Sinatra Framework',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Authentication'],
        title: `${cohort} Authentication in Rails`,
        description: 'Learn Create, Read, Update, and Delete functionality using the Sinatra Framework',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Rails Project Mode'],
        title: `${cohort} Rails Portfolio Project Prep`,
        description: 'Preparation for your Rails Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['Rails Project Mode'],
        title: `${cohort} Rails Portfolio Project Prep`,
        description: 'Preparation for your Rails Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['Rails Project Mode'],
        title: `${cohort} Rails Portfolio Project Hours`,
        description: 'Open Office Hours for your Rails Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    },
    {
        categories: ['Rails Project Mode'],
        title: `${cohort} Rails Portfolio Project Hours`,
        description: 'Open Office Hours for your Rails Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    }
]

let javascriptSection = [
    {
        categories: ['Introducing the DOM and Just Enough JavaScript'],
        title: `${cohort} Intro to JavaScript`,
        description: 'Intro to JavaScript',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Introducing the DOM and Just Enough JavaScript'],
        title: `${cohort} Intro to JavaScript`,
        description: 'Intro to JavaScript',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['JavaScript Eventing'],
        title: `${cohort}  JavaScript Events and DOM Manipulation`,
        description: 'JavaScript Events and DOM Manipulation',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['JavaScript Eventing'],
        title: `${cohort} JavaScript Events and DOM Manipulation`,
        description: 'JavaScript Events and DOM Manipulation',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Use Fetch'],
        title: `${cohort} AJAX and Fetch`,
        description: 'AJAX and Fetch',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Use Fetch'],
        title: `${cohort} Using Fetch`,
        description: 'AJAX and Fetch',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Rails as an API'],
        title: `${cohort} Building a Rails API`,
        description: 'Make a RoR API to use with your JS frontend',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Rails as an APIs'],
        title: `${cohort} Building a Rails API`,
        description: 'Make a RoR API to use with your JS frontend',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Functions in JavaScript'],
        title: `${cohort} Advanced JS Functions`,
        description: 'Advanced Functions in JavaScript',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Functions in JavaScript'],
        title: `${cohort} Advanced JS Functions`,
        description: 'Advanced Functions in JavaScript',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Object Orientation in JavaScript'],
        title: `${cohort} Object Oriented JS`,
        description: 'Object Oriented JavaScript',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Object Orientation in JavaScript'],
        title: `${cohort} Object Oriented JS`,
        description: 'Object Oriented JavaScript',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['JavaScript and Rails'],
        title: `${cohort} JavaScript/Rails Project Overview`,
        description: 'Preparation for your JavaScript and Rails Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['JavaScript and Rails'],
        title: `${cohort} JavaScript/Rails Project Overview`,
        description: 'Preparation for your JavaScript and Rails Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['JavaScript and Rails'],
        title: `${cohort} JavaScript Final Project OOH`,
        description: 'Open Office Hours for your JavaScript Rails Portfolio Project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    },
    {
        categories: ['JavaScript and Rails'],
        title: `${cohort}  JavaScript Final Project OOH`,
        description: 'Open Office Hours for your JavaScript Rails Portfolio Project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    }
]



let reactSection = [
    {
        categories: ['Introduction to React'],
        title: `${cohort} Intro to React & Props`,
        description: 'Intro to React & Props',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Introduction to React'],
        title: `${cohort} Intro to React & Props`,
        description: 'Intro to React & Props',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[0],
        weekToEnd: studygroupWeeks[0],
        zoom
    },
    {
        categories: ['Props and State'],
        title: `${cohort}  React State, Events, Forms`,
        description: 'React State, Events, Forms',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Props and State'],
        title: `${cohort} React State, Events, Forms`,
        description: 'React State, Events, Forms',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[1],
        weekToEnd: studygroupWeeks[1],
        zoom
    },
    {
        categories: ['Lifecycle Methods'],
        title: `${cohort} React Lifecycle Methods`,
        description: 'React Lifecycle Methods',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Lifecycle Methods'],
        title: `${cohort} React Lifecycle Methods`,
        description: 'React Lifecycle Methods',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[2],
        weekToEnd: studygroupWeeks[2],
        zoom
    },
    {
        categories: ['Container Components'],
        title: `${cohort} Presentational vs Container Components`,
        description: 'Presentational vs Container Components',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Container Components'],
        title: `${cohort} Presentational vs Container Components`,
        description: 'Presentational vs Container Components',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[3],
        weekToEnd: studygroupWeeks[3],
        zoom
    },
    {
        categories: ['Client-Side Routing'],
        title: `${cohort} Intro to Client Side Routing`,
        description: 'Intro to Client Side Routing',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Client-Side Routing'],
        title: `${cohort} Intro to Client Side Routing`,
        description: 'Intro to Client Side Routing',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[4],
        weekToEnd: studygroupWeeks[4],
        zoom
    },
    {
        categories: ['Redux'],
        title: `${cohort} Intro to Redux & Async`,
        description: 'Intro to Redux & Async',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Redux'],
        title: `${cohort} Intro to Redux & Async`,
        description: 'Intro to Redux & Async',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[5],
        weekToEnd: studygroupWeeks[5],
        zoom
    },
    {
        categories: ['Redux'],
        title: `${cohort} Let’s Build Redux From Scratch`,
        description: 'Understand Redux and prep for React/Redux final project',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['Redux'],
        title: `${cohort} Let’s Build Redux From Scratch`,
        description: 'Understand Redux and prep for React/Redux final project',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[6],
        weekToEnd: studygroupWeeks[6],
        zoom
    },
    {
        categories: ['React Redux Portfolio Project'],
        title: `${cohort} React Final Project OOH`,
        description: 'React Final Project OOH',
        day: day1,
        time: time1,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    },
    {
        categories: ['React Redux Portfolio Project'],
        title: `${cohort}  React Final Project OOH`,
        description: 'React Final Project OOH',
        day: day2,
        time: time2,
        weekToStart: studygroupWeeks[7],
        weekToEnd: studygroupWeeks[7],
        zoom
    }
]


let sgData = reactSection

// Shorten element selectors
const byId = id => document.getElementById(id);
const firstByClass = id => document.getElementsByClassName(id)[0];
const firstByName = id => document.getElementsByName(id)[0];

// Action functions
const openModal = async () => byId('js--new-button').click();
const closeModal = async () => byId('js--site-overlay').click();
const submit = async () => byId('js--submit').click();
const changeFocus = async () =>
	(firstByClass('selectize-dropdown multi plugin-remove_button').style =
		'display: none; width: 348px; top: 55px; left: 0px; visibility: visible;');

// Form filler functions
const addTitle = async title =>
	(firstByName('study_group[title]').value = title);

const addDescription = async description =>
	(firstByName('study_group[description]').value = description);

const removeExistingCategory = async () => {
	firstByClass('selectize-control multi plugin-remove_button')
		.getElementsByClassName(
			'selectize-input items required not-full has-options has-items'
		)[0]
		.children[0].getElementsByTagName('a')[0]
		.click();
};

const addNewCategory = async categories => {
	categories.map(cat => {
		firstByClass('selectize-dropdown multi plugin-remove_button')
			.querySelectorAll('[data-value]')
			.forEach(categoryNode => {
				if (categoryNode.innerText === cat) {
					categoryNode.click();
				}
			});
	});
};

const addDate = async date => {
	const dateToday = getFormattedDate(new Date());
	const todaysMonth = parseInt(dateToday.split('/')[0]);
	const futureMonth = parseInt(date.split('/')[0]);
	const diff = futureMonth - todaysMonth;


	if (diff > 0) {
		for (let i = 0; i < diff; i++) {
			firstByClass('picker__nav--next').click();
		}
	}
	if (diff < 0) {
		for (let i = 0; i < diff+12; i++) {
			firstByClass('picker__nav--next').click();
		}
	}

	byId('js--study-group-start-date_root')
		.querySelectorAll('[data-pick]')
		.forEach(dateNode => {
			if (dateNode.outerHTML.includes(date)) {
				dateNode.click();
			}
		});

};

const addTime = async time => {
	byId('js--study-group-start-time_root')
		.querySelectorAll('[data-pick]')
		.forEach(timeNode => {
			if (timeNode.innerHTML === time) {
				timeNode.click();
			}
		});
};

const addDuration = async () => (firstByName('duration').value = 1);

const addZoomUrl = async url =>
	(firstByName('study_group[custom_room_url]').value = url);

// Helper functions
const calculateDate = (day, week) => {
	// const d = new Date();
	const dates = {
		Monday: 0,
		Tuesday: 1,
		Wednesday: 2,
		Thursday: 3,
		Friday: 4,
		Saturday: 5,
		Sunday: 6
	};
  
    const d = addDays(dates[day], vacationMonday(new Date(week)))
    // console.log(week)
    // console.log(new Date(week))
  return getFormattedDate(d);
};

const getFormattedDate = date => {
	const month = date.getMonth() + 1;
	const dayNum = date.getDate();

	// Returns date in this format: 07/25/2019
	return `${month < 10 ? `0${month}` : month}/${
		dayNum < 10 ? `0${dayNum}` : dayNum
	}/${date.getFullYear()}`;
};

const formatTime = time => {
	// If this errors out send an alert that the time is formatted wrong
	const validateTime = time =>
		/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?\s*[p, a]/.test(time);

	const hour = parseInt(time.split(':')[0]);
	const minutes = parseInt(time.split(':')[1].slice(0, 2));
	const amPm = time
		.split(':')[1]
		.slice(2, time.length - 1)
		.trim()
		.toLowerCase();

	const formattedTimeString = `${hour}:${minutes === 0 ? '00' : '30'} ${
		amPm.length >= 2 ? amPm[0] : amPm
	}.m.`;

	if (validateTime(time)) {
		return formattedTimeString;
	} else {
		alert(
			`You gotta fix your time for '${
				sg.title
			}', you wrote: '${time}'. Example of an accepted format: '6:00 pm'`
		);
	}
};

// Main function
const init = async () => {
	for await (sg of sgData) {
		const time = sg.time.toLowerCase();
		const formattedTime = formatTime(time);
        const week = sg.weekToStart
		// Calling the range function with weekToStart being 2 and weekToEnd being 5: [...range(2, 5)] will e.g. return [2,3,4,5]
		// function* range(weekToStart, weekToEnd) {
		// 	yield weekToStart;
		// 	if (weekToStart === weekToEnd) return;
		// 	yield* range(weekToStart + 1, weekToEnd);
		// }

		// for await (week of [...range(sg.weekToStart, sg.weekToEnd)]) {
			await openModal();
			await addTitle(sg.title);
			await addDescription(sg.description);
			await removeExistingCategory();
			await changeFocus();
			await addNewCategory(sg.categories);
			await changeFocus();
			await addDate(calculateDate(sg.day, week));
			await addTime(formattedTime);
			await addDuration();
			await addZoomUrl(sg.zoom);
			await submit();
			await closeModal();
			console.log(sg);
		// }
	}
};

const init2 = async () => {
	for await (sg of sgData) {
		const time = sg.time.toLowerCase();
		const formattedTime = formatTime(time);

		// Calling the range function with weekToStart being 2 and weekToEnd being 5: [...range(2, 5)] will e.g. return [2,3,4,5]
		function* range(weekToStart, weekToEnd) {
			yield weekToStart;
			if (weekToStart === weekToEnd) return;
			yield* range(weekToStart + 1, weekToEnd);
		}
        // console.log(sg.weekToStart)
		for (week of [...range(sg.weekToStart, sg.weekToEnd)]) {

			console.log(`Title: ${sg.title}`);
			console.log(`Description: ${sg.description}`);
			console.log(`Categories: ${sg.categories}`);
			console.log(`Date: ${calculateDate(sg.day, week)}`);
			console.log(`Time: ${formattedTime}`);
			console.log(`Duration: ${sg.duration}`)
			console.log(`Zoom: ${sg.zoom}`);
            console.log(`Successfully created: ${sg.title}`);
            console.log('--------------------------------------')
		}
	}
};

init2()
