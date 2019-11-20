function Person(name, age){
    const secret = "I have a secret!"
    this.name = name
    this.age = age


    this.whisperSecret = function(){
        console.log(`SHHHH! ${secret}`)
    }
}


annabel = new Person('Annabel', 26)
micah = new Person('Micah', 29)

Person.prototype.sayHi = () => console.log('HI!')
Person.prototype.legCount = 2

annabel.name
micah.name
annabel.sayHi()
console.log(annabel.secret)
annabel.whisperSecret() 
console.log(micah.legCount)