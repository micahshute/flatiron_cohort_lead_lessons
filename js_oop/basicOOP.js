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
console.log(myRectangle.area()) // => 
console.log(myRectangle.width) // => 
console.log(myRectangle.length) // => 
myRectangle.sayHi()// =>