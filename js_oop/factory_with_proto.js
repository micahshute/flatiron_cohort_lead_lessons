function Person(name, age){
    prototype = {
        legCount: 2
    }

    return {
        name: name, 
        age: age,
        sayHi: () => console.log('HI!!'),
        __proto__: prototype
    }
}

annabel = Person('Annabel', 26)
console.log( annabel.name)
console.log( annabel.legCount )

