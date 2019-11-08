document.addEventListener("DOMContentLoaded", function(){

    let textElements = document.querySelectorAll("text")

    for(let el of textElements){
        console.log(el)
        el.addEventListener("click", (e) => alert(e.target.innerText))
    }

    let buttons = document.querySelectorAll("button")

    for(let btn of buttons){
        btn.addEventListener("click", (e) => event.target.parentNode.remove())
    }


    let form = document.querySelector('form')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        let input = document.querySelector("input#noise-input")
        let ul = document.querySelector("ul")


        let text = document.createElement("text")
        text.textContent = input.value
        text.addEventListener("click", (event) => alert(event.target.textContent))

        let button = document.createElement("button")
        button.textContent = "Delete"
        button.addEventListener("click", (event) => event.target.parentNode.remove())

        let li = document.createElement("li")
        li.appendChild(text)
        li.appendChild(button)

        ul.appendChild(li)

        input.value = ""
    })

})
