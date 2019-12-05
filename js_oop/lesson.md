# OOP in JavaScript









### Ways to represent a person


#### Option 1 --> Make a JS object for each person:

```js
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
```

Downsides:
    - This is not DRY
    - You can have people with different attributes if you mess up (e.g. forget a key-value pair)
    - Adding to the prototype adds to prototypes of ALL objects
```js

micah.__proto__.legCount = 2

micah.legCount // 2 
annabel.legCount // 2

dog = { name: "Pongo", breed: "Dalmation" }

dog.legCount // 2

```
Note: you could define a prototype for each object (shown below in Option 2), but would have to set each one individually, which is not DRY

#### Option 2: Factory Method

```js

function Person(name, age){
    return {
        name: name, 
        age: age,
        sayHi: () => console.log('HI!!')
    }
}

```

Positives: 
- Ensures uniformity
- Can encapsulate variables:

```js
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
annabel.secret // 
annabel.whisperSecret() // 


```
- Can easily add a custom prototype:

```js
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
annabel.name
annabel.legCount

```
- `new` keyword not required


#### Constructor functions


```js

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
```




Positives:
- Encapsulation possible 

Downsides:
- If you forget to say `new` your code will not work properly - this is a common bug 
- If you forget `new` you will be adding the attributes defined in the constructor function to the `window`
- Adding protoypes is PIA



### Positives/Negatives of class syntax

Positives:
- It is the future of JS
- It is very organized 
- It is similar to other OOP languages

Negatives:
- No encapsulation (as of now, but it is being implemented soon)
- Read up further [here]()


### Standard class syntax


```js

class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectange!")
        }
    }


    area(){
        return this.width * this.length
    }


}


const myRectangle = new Rectangle(3,4)
myRectangle.area() // => 
myRectangle.width // => 
myRectangle.length // => 
myRectangle.sayHi() // =>


```



### Class methods


- add the static keyword


```js

class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    static createSquare(side){
        return new Rectangle(side, side)
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectange!")
        }
    }


    area(){
        return this.width * this.length
    }


}

const mySquare = Rectangle.createSquare(3)
mySquare.sayHi() // => 
console.log(mySquare.area()) // => 9

```


### Getters and setters

- Lets you access/set computed properties as if they were instance variables


```js
class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    static createSquare(side){
        return new Rectangle(side, side)
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectange!")
        }
    }


    get area(){
        return this.width * this.length
    }

    set area(newArea){
        if( this.width === this.length){
            this.width = Math.sqrt(newArea)
            this.length = this.width
        }else{
            console.log('You can only set the area of a square!')
        }
    }


}


const mysquare = Rectangle.createSquare(5)
console.log(mysquare.area) // => 
mysquare.area = 9 // =>
console.log(mysquare.width) // => 
console.log(mysquare.length) // => 


const myRectangle = new Rectangle(5,7)
myRectangle.area = 3 // => 

```





### Context of a SPA


We want to encpaulate the object we want to display on the page as classes. For example, if we wanted to display a Pokemon, we could make it into a class and provide a method which could render itself.


```js


class Pokemon{


    constructor(id, name, types){
        this.id = id
        this.name = name
        this.types = types
    }



    get HTML(){

        return(`
            <div class="pokemon-card">

                <h3>${this.id} - ${this.name}</h3>
                <ul>
                    ${this.createTypeLIs()}
                </ul>
            </div>
        `)

    }


    createTypeLIs(){

        return this.types.map(type => {
            return `<li>${type}</li>`
        }).join('')
    }
}


const arcanine = new Pokemon(182, 'Acranine', ['Fire', 'Water'])

console.log(arcanine.HTML)


```


```js
class Pokemon{

    constructor(params){
        this.id = params.id
        this.name = params.name
        this.types = params.types
    }


    get html(){
        return(`
            <div class="pokemon-card">
                <h3>${this.id} - ${this.name}</h3>
                <ul>
                    ${this.createTypeLis()}
                </ul>
            </div>
        `)
    }


    createTypeLis(){
        return this.types.map(type => {
            return `<li>${type}</li>`
        }).join('')
    }


}

class PokemonAdapter{


    static fakeFetchAll(){
        const json = [
            {id: 182, name: 'Arcanine', types: ['Fire', 'Water']},
            {id: 1, name: "Bulbasaur", types: ['Grass', 'Poison']},
            {id: 4, name: "Squirtle", types: ['Water']}
        
        ]
        return json
    }
}

class PageManager{

    constructor(){
        this.container = {innerHTML: ''}
        this.adapter = PokemonAdapter
        this.pokemon = []
        this.fakeFetchPokemon()
    }

    fakeFetchPokemon(){
        const json = this.adapter.fakeFetchAll()
        this.pokemon = json.map(o => new Pokemon(o))
        this.render()
    }

    render(){
        this.container.innerHTML = this.pokemon.map(p => p.html).join('')
        console.log(this.container.innerHTML)
    }

}


new PageManager()

```