document.addEventListener("DOMContentLoaded", function(){

    document.addEventListener("mousemove", (e) => {
        ptag = document.querySelector("#output")
        ptag.innerText = `X: ${e.clientX}, Y: ${e.clientY}`
    })



})