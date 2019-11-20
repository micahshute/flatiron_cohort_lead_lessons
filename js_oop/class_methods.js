
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