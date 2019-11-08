function listener(e){
    switch(e.target.tagName){
        case "TEXT":
            alert(e.target.innerText)
            break
        case "BUTTON":
            e.target.parentNode.remove()
            break
        default:
            console.log('something else was pressed')
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let noiseContainer = document.querySelector("div#noise-container")
    noiseContainer.addEventListener('click', listener)
})

