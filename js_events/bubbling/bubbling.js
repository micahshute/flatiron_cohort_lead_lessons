document.addEventListener("DOMContentLoaded", () => {
    let div = document.querySelector("#container")
    let ul = document.querySelector("#list")
    let li = document.querySelector("#item")

    // function logThisAndTarget(event){
    //     console.log("THIS", this)
    //     console.log("TARGET", event.target)
    // } 

    let logThisAndTarget = function(){
        console.log("THIS", event.currentTarget)
        console.log("TARGET", event.target)
    }
    div.addEventListener('click', logThisAndTarget)
    ul.addEventListener('click', logThisAndTarget)
    li.addEventListener('click', logThisAndTarget)
})




