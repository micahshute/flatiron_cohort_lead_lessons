

document.addEventListener('DOMContentLoaded', () => {

    const button = document.createElement('button')
    button.innerText = 'See Secret'
    button.addEventListener('click', () => {
        window.history.pushState(
            {seen: true},
            'myTitle',
            '/secret'
        )
        renderSecret()
    })
    document.body.appendChild(button)
})

function renderSecret(){
    const secret = document.querySelector('#secret')
    if(secret){
        secret.remove()
        const button = document.querySelector('button')
        window.history.pushState({}, '', '/')
        button.innerText = 'See Secret'
        return
    }
    const button = document.querySelector('button')
    button.innerText = 'Hide Secret'
    const p = document.createElement('p')
    p.innerText = 'WISH I COULD HAVE GONE WITH RYAN ON THAT COOL RETREAT! I HAVE HEMEROIIIDDSSSSS!'
    p.id = 'secret'
    document.body.appendChild(p)
}


window.addEventListener('popstate', e => {
    const state = e.state
    console.log(e.state)
    if(state.seen){
        alert('You have seen the secret already')
    }
})