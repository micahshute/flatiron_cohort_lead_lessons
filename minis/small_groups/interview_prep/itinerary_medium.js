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









// Given the list of flights 
// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.






// Given the list of flights 
// [('A', 'C'), ('A', 'B'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.

// index of the problem im on = 0
// indices array = [[], []]
// current location = []
// itinerary = []
//REPEAT START
// look through all input flight pairs that are NOT in my indice array
// and keep track of the ones that match my location
    // pick the alphabetically first one
    // IF found
        // add destination to my itinerary
        // update my current location to be my destination
        // add current flight index to indice array
    // ELSE 
        // return null
//REPEAT until indice array length is the same as input array length
// return itinerary


// Given the list of flights 
// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 









// INPUT: array of origin, dest Pairs, starting location 
// OUTPUT: null or the order of places i went

// [('SFO', 'HKO'), ('YYZ', 'SFO'), ('YUL', 'YYZ'), ('HKO', 'ORD')] 
// and starting airport 'YUL', you should return the list 
// ['YUL', 'YYZ', 'SFO', 'HKO', 'ORD'].

// indices [2, 1, 0, 3]
// itinerary = [YUL, YYZ, SFO, HKO, ORD]
// current location = ORD






// Given the list of flights 
// [('A', 'C'), ('A', 'B'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.


// current location is my starting location
// itinerary is [[startingLoc], [startingLoc] ]
// inidces = [[], []]
// current itinerary = 0

//BEGIN REPEAT
// iterate over input array,
    // find ALL origins that matches my current location IF that origin is not in indice array
        // add destination of found match to the itinerary
        // update current location to match
        // update indice array with index of flight taken
    // if not found
        // return null
//REPEAT until my indice array length matches my input arr length
// return itinerary










// Given the list of flights 
// [('A', 'C'), ('A', 'B'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.

//[[], [], [], []]
//[[A, C], [A, B], [], []]
// location is A

// initialize itineray with input location as the only element
// make empty inice array
// current location starts as input locaiton
// Iterate through all flights until you find one where currentlocation is the origin
    // if found in an index NOT in the indice array, 
        // add dest to my itinerary
        // update current location to be the dest
        // add index of taken flight to my indices array
    // else
        // return null
// REPEoAT iteration until the length f my indices array is the same as my input array
// return sorted(itinerary)[0]







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

// RECURSIVE SOLUTION
function rsoln(arr, start){
    const allItineraries = rhelp(arr, start)
    const sortedItineraries = allItineraries.sort((i1, i2) => {
        const str1 = i1.join('')
        const str2 = i2.join('')
        if(str1 > str2){
            return 1
        }else if(str1 < str2){
            return -1
        }else{
            return 0
        }
    })
    return sortedItineraries[0]
}

function rhelp(arr, start){
    let itinerary = []
    if(arr.length === 0){ return [[start]]}
    for(let i = 0; i < arr.length; i++){
        if(arr[i][0] === start){
            const newOrgDestArr = [...arr]
            newOrgDestArr.splice(i,1)
            const recursiveItinearary = rhelp(newOrgDestArr, arr[i][1])
            for(let itry of recursiveItinearary){
                if(itry){ 
                    itinerary.push([start,...itry])
                }
            }
        }
    }
    if(itinerary.length === 0 ){ return [null] }
    return itinerary

}



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


// [('A', 'B'), ('A', 'C'), ('B', 'C'), ('C', 'A')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 
// However, the first one is lexicographically smaller.



// While hash has keys
    // Does my hash have my current locaiton? 
        //YES
            // shift off the first value and add it to my itinerary
            // if value is [], delete key
        // NO
            // pop off the last value from my itinerary
            // put it back at the END of my array that holds my current location
    // When flight is taken, shift that flight from the value array. If that array is now empty, remove the key


//TODO: Update solution that actually works

// current destination = C
// itinerary = [A, B, C, A, C]

// if my current dest is in my hash, then shift off the first value and add it to my itinerary
    // update current dest. to be the last value in my itinerary
    // if the shifted array is empty, remove the key entirely
// if the elemement is NOT a key, return null
//REPEAT until there are no keys left


// [('A', 'B'), ('A', 'C'), ('D', 'A'), ('C', 'D')] 
// and starting airport 'A', you should return the list 
// ['A', 'B', 'C', 'A', 'C'] even though 
// ['A', 'C', 'A', 'B', 'C'] is also a valid itinerary. 


// itinerary = [A, B, C, A, C]

// if location is a key in my hash
    // get destination by shifting off first element
    // put destination in itinerary
    // after shift, if the value is an [], delete key-value pair
// else
    //     


// REPEAT UNTIL no keys are left in my hash


// THIS SOLUTION DOES NOT WORK FOR EDGE CASES
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
const ranswer1 = rsoln(flightList1, start1)

const flightList2 = [('SFO', 'COM'), ('COM', 'YYZ')] 
const start2 = 'COM'
const expected2 = null
const answer2 = createItinerary(flightList2, start2)
const ranswer2 = rsoln(flightList2, start2)


const flightList3 = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'A']]
const start3 = 'A'
const expected3 = ['A', 'B', 'C', 'A', 'C']
const answer3 = createItinerary(flightList3, start3)
const ranswer3 = rsoln(flightList3, start3)


const flightList4 = [['A', 'B'], ['A', 'C'], ['D', 'A'], ['C', 'D']]
const start4 = 'A'
const expected4 = ['A', 'C', 'D', 'A', 'B']
const answer4 = createItinerary(flightList4, start4)
const ranswer4 = rsoln(flightList4, start4)

console.log(answer1, expected1)
console.log(answer2, expected2)
console.log(answer3, expected3)
console.log(answer4, expected4)