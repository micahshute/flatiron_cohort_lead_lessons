console.log('------- FILTER -----------')

const arr = [1,2,3,4,5,6,7]


arr.filter(function(el){ return el % 2 == 0 })


// OR


arr.filter(el => {
    return el % 2 == 0
}) // [2,4,6]

//OR THIS (notice the implicit return below)
// The return is necessary

const filtered = arr.filter(el => el % 2 == 0)
console.log(filtered) // [2, 4, 6]

// The rest will use arrow functions, but remember you could use the function syntax as well

console.log('----------- MAP ----------')

// Don't forget the implicit return is necessary!
// If you do any other syntax, you need a `return` statement

const mapped = arr.map(el => el * 2)
console.log(mapped) // [2,  4,  6, 8, 10, 12, 14]

console.log('---------- REDUCE --------')

// REDUCE

const sum = arr.reduce((memo, i) => memo + i, 0)
console.log(sum) // 28