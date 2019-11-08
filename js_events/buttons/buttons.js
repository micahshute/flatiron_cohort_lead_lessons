document.addEventListener("DOMContentLoaded", function(){

    let textElements = document.querySelectorAll("text")

    for(let el of textElements){
        console.log(el)
        el.addEventListener("click", (e) => alert(e.target.text))
    }

    let buttons = document.querySelectorAll("button")

    for(let btn of buttons){
        btn.addEventListener("click", (e) => event.target.parentNode.remove())
    }

})


