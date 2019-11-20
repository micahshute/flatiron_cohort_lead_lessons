// ------------ 1 -------------------

function sayHelloFn(name){
    console.log(`Hello, I am ${name}`)
}

const fnHolder = sayHelloFn
fnHolder('Micah') // => Hello, I am Micah

//OR 

const sayHello = (name) => console.log(`Hello, I am ${name}`)
sayHello('Micah') // Hello, I am Micah

// -------------- 2 -------------------
console.log('---------- 2 --------------')

function add(a,b){
    return a + b
}

function subtract(a,b){
    return a - b
}

function multiply(a,b){
    return a * b
}

function divide(a,b){
    return a / b
}

function performMath(a,b, fn){
    return fn(a,b)
}


console.log(performMath(4,8, add)) // 12
console.log(performMath(4,8, subtract)) // - 4
console.log(performMath(4,8, multiply)) // 32
console.log(performMath(4,8, divide)) // 0.5

// OR
console.log('OR')
const aadd = (a,b) => a + b
const asubtract = (a,b) => a - b
const amultiply = (a,b) => a * b
const adivide = (a,b) => a / b

const aperformMath = (a,b,fn) => fn(a,b) 

console.log(aperformMath(4,8, aadd)) // 12
console.log(aperformMath(4,8, asubtract)) // - 4
console.log(aperformMath(4,8, amultiply)) // 32
console.log(aperformMath(4,8, adivide)) // 0.5

// ---------------- 3 -----------------
// Note: will be going back and forth in between function and arrow fn syntax
console.log('---------------- 3 -------------')


function lazyCalcMin(arr){
    return function(){
        let min = Infinity
        for(let el of arr){
            if(el < min){
                min = el
            }
        }
        return min
    }
}

const array = [6,8,2,4,99,13,52,315,30,92,2]

const readyToCalc = lazyCalcMin(array)
console.log(readyToCalc) // [Function]
console.log(readyToCalc()) // 2

// Note that the variable passed into lazyCalcMin is available to the function
// returned from lazyCalcMin