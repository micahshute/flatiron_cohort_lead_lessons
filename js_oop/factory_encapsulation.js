
function Person(name, age){
    const secret = "I have a secret"
    return {
        name: name, 
        age: age,
        sayHi: () => console.log('HI!!'),
        whisperSecret: () => console.log(`SHHHH!: ${secret}`)
    }
}

annabel = Person('Annabel', 26)
console.log(annabel.secret) // 
annabel.whisperSecret() // 