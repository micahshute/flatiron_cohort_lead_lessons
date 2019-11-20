const micah = {
    name: 'micah'
}

const annabel = {
    name: 'annabel'
}

function sayHi(){
    console.log(`Hi, I am ${this.name}`)
}

// const sayHi = () => console.log(`Hi, I am ${this.name}`)


micah.greet = sayHi
annabel.greet = sayHi

console.log(micah.greet === annabel.greet ) // true


micah.greet() // Hi, I am micah
annabel.greet() // Hi, I am annabel



