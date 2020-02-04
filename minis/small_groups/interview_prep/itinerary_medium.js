// This problem was asked by Facebook.

// Given an unordered list of flights taken by someone, 
// each represented as (origin, destination) pairs, and a 
// starting airport, compute the person's itinerary. 
// If no such itinerary exists, return null. 
// If there are multiple possible itineraries, return the 
// lexicographically smallest one. All flights must be used 
// in the itinerary.

// For example, given the list of flights 
// [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] 
// and starting airport 'YUL', you should return the list 
// ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].

// Given the list of flights [('SFO', 'COM'), ('COM', 'YYZ')] 
// and starting airport 'COM', you should return null.

// Given the list of flights 
// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.

// ******************************************************* 

// 1 Understand the question

// INPUT: Array of arrays: [Start, End], Start
// OUTPUT: Lexicographically smallest output

// Brute Force 1: 
// While input arr.length > 0
    // Find all departures that matches currentDeparture
    // Choose the one with the first alphabetical destination, add that to itinerary
    // remove that pair from the arr
// return itinerary

// For example, given the list of flights 
// [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] 
// and starting airport 'YUL', you should return the list 
// ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].


// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 







// Brute force 2 (redursion): 

//EXAMPLES
// [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] 
// and starting airport 'YUL', you should return the list 
// ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].


// YUL --> return ['YUL', 'YYZ', 'SFO', 'ORD']
// YYZ --> return ['YYZ', 'SFO', 'ORD']
// SFO --> return ['SFO', 'ORD']
// HKO --> return ['ORD']




// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.

// A --> [(a,c),(b,c),(c,a)], b ; return [a,b,c,a,c]AND A --> [(a,b), (b,c), (c,a)], c ; return [a,c,a,b,c]
// B --> [(a,c), (c,a)], c ; return [b,c,a,c]          C --> [(a,b),(b,c)], a ; return [c,a,b,c]
// C --> [(a,c)], a ; return [c,a,c]                   A --> [(b,c)], b ; return [a,b,c]
// A --> [], c ; return [a,c]                          B --> [],c ; return [b,c]
// C --> return [c]                                    C --> return [c]


// PCODE (BF2)
// itinerary = []
// if dest/arr pair.length == 0, return [start]
// for every dest/arrival pair:
    // found = false
    // if dest == currentDest
        // found = true
        // allItineraries = thisFunction(inputArrWithoutCurrentPair, arrivalFromPair))
        // return null if !allItineraries
        // insert currentDest at the front of every itinerary in allItineraries
        //itinerary.push(allItineraries)

// return found ? itinerary : null





// Using Hashes:
// Turn input into hash of departure: [arrivals] kv pairs. sort arrivals
// itinerary = [currentDeparture]
// while hash not empty
    // currentDeparture is last element in itinerary
    // if currentDeparture is not a key not in the hash, return null
    // shift off first index of array value of the key, add to itinerary
    // if array is now empty, remove key
// return itinerary


// [('A', 'B'), ('A', 'C'), ('D', 'A'), ('C', 'D')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 

//TODO: Update solution that actually works

function createItinerary(adList, start){
    const arrDepHash = {}
    const itinerary = [start]
    for(let depArr of adList){
        if(arrDepHash[depArr[0]]){
            arrDepHash[depArr[0]].push(depArr[1])
            arrDepHash[depArr[0]].sort()
        }else{
            arrDepHash[depArr[0]] = [depArr[1]]
        }
    }
    while(Object.keys(arrDepHash).length > 0){
        const currentDeparture = itinerary[itinerary.length - 1]
        const nextDestinationList = arrDepHash[currentDeparture]
        if(!nextDestinationList){ 
            return null

        }
        const nextDestination = nextDestinationList.shift()
        itinerary.push(nextDestination)
        if(nextDestinationList.length <= 0){ delete arrDepHash[currentDeparture]}
    }
    return itinerary
}



const flightList1 = [['SFO', 'HKO'], ['YYZ', 'SFO'], ['YUL', 'YYZ'], ['HKO', 'ORD']]
const start1 = 'YUL' 
const expected1 = ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD']
const answer1 = createItinerary(flightList1, start1)


const flightList2 = [('SFO', 'COM'), ('COM', 'YYZ')] 
const start2 = 'COM'
const expected2 = null
const answer2 = createItinerary(flightList2, start2)


const flightList3 = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'A']]
const start3 = 'A'
const expected3 = ['A', 'B', 'C', 'A', 'C']
const answer3 = createItinerary(flightList3, start3)

console.log(answer1, expected1)
console.log(answer2, expected2)
console.log(answer3, expected3)