// This problem was asked by Facebook.

// Given an array of integers in which two elements appear exactly once and all other elements appear exactly twice, find the two elements that appear only once.

// For example, given the array [2, 4, 6, 8, 10, 2, 6, 10], return 4 and 8. The order does not matter.

// Follow-up: Can you do this in linear time and constant space?



// First step: Logic in english. How do you want to solve this??



// Naive solution
// Pseudocode:

// For every number, check to see if it is listed again
// If that number is found, that number is NOT put into the return array. 
// If that number is NOT found, it IS put in the return array
// Return the array

const nums = [2, 4, 6, 8, 10, 2, 6, 10]


function solution(arr){
    const retNums = []
    for(let i = 0; i < arr.length; i++){
        let found = false
        for(let j = 0; j < arr.length; j++){
            if(j === i){ continue }
            if(arr[i] === arr[j]){ 
                found = true
                break
            }
        }
        if(!found){
            retNums.push(arr[i])
        }
    }
    return retNums
}

console.log(solution(nums))

// What is the runtime of the above function?

// O(n^2)

//Wny?

// For each number you iterate through every number. You do n-1 checks n times.



// Linear time. 

// To figure out if we can do it linear time, ask yourself: do I get enough information
// by passing through the numbers once?

// n
function linearTimeSet(arr){
    const letterTracker = new Set([])
    for(let el of arr){
        if(letterTracker.has(el)){
            letterTracker.delete(el)
        }else{
            letterTracker.add(el)
        }
    }
    return letterTracker
}


// 2n
function linearTimeHash(arr){
    const letterTracker = {}
    const retArr = []
    for(let el of arr){
        if(!letterTracker[el]){
            letterTracker[el] = 1
        }else{
            letterTracker[el] += 1
        }
    }
    for(let el in letterTracker){
        if(letterTracker[el] < 2){
            retArr.push(el)
        }
    }
    return retArr
}

console.log(linearTimeSet(nums))
console.log(linearTimeHash(nums))

// What is the runtime of these?

// Hash: O(2n) = O(n)
// Set: O(n)

// Have we solved it? Not yet, why?

//Why is the space complexity of both of these O(n)? 

// Even with the set, where we remove elements as we re-find them, worst case scenario
// we see every unique element first and THEN the doubles, which requires n/2 space, which is O(n)



// Space is O(n) but we need it O(1)

//Intuition: XOR of a number with itself is 0, XOR of 0 with a number is that number
// The XOR of the XOR of 2 numbers with one of those numbers is the other number


//The XOR will hold the 2 numbers combined. How do we figure out which one it is?
// Well, the result of an XOR, when 1, must be the result of a 1 and a 0
// XOR Truth Table:

// 0 + 0 = 0
// 0 + 1 = 1
// 1 + 0 = 1
// 1 + 1 = 0

// So, find a position where XOR result has a 1. 
// Out of the 2 numbers we want, one will have a 0 there, one will have a 1

// Spit the numbers into 2 groups - one with a 1 in that position, one with a 0
// Take the XOR of each one and get the 2 numbers. (Grouping this way will have
// all doubles and one of the 2 numbers we want)

function linTimeConstSpace(arr){
    let xorTot = 0

    for(let el of arr){
        xorTot = xorTot ^ el
    }
    let binaryXOR = xorTot.toString(2).split('')
    let indexOf1 = binaryXOR.findIndex(binNum => binNum === "1")
    let placeOf1 = binaryXOR.length - indexOf1

    let xor1 = 0
    let xor2 = 0

    for(let el of arr){
        let binaryNum = el.toString(2).split('')
        if(binaryNum[binaryNum.length - placeOf1] === "1"){
            xor1 = xor1 ^ el
        }else{
            xor2 = xor2 ^ el
        }
    }

    return [xor1, xor2]
}

console.log(linTimeConstSpace(nums))



//RUNTIME NOTES: Doing things like include, filter, and map are O(n).
// if you do them n times, you have an O(n^2) algorithm


// Other ways:


// O(nlgn): Sort the list, then choose the numbers that are not adjacent to
// themselves


