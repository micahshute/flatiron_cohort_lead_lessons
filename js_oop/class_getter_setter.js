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
