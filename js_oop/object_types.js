annabel = {
    name: "Annabel",
    age: 26, 
    sayHi: () => console.log("HI!!")

}

micah = {
    name: "Micah",
    age: 29,
    sayHi: () => console.log("HI!!")
}


annabel.sayHi()
micah.sayHi()

micah.__proto__.legCount = 2

console.log(micah.legCount) // 2
console.log(annabel.legCount) //  2

dog = { name: "Pongo", breed: "Dalmation" }

console.log(dog.legCount) //2