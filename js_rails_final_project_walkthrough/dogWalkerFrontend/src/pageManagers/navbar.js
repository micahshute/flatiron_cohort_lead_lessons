class Navbar extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = adapter
    }

    get is_authenticated(){
        return !!this.adapter.token
    }

    initBindingsAndEventListeners(){

        this.container.addEventListener('click', this.handleClick.bind(this))

    }

    handleClick(e){
        if(e.target.tagName === "A"){
            e.preventDefault()
            if(e.target.id !== 'logout-link'){
              const route = e.target.id.split('-')[0]
              if(route !== this.currentPage()) { this.redirect(route) } 
            }else{
              this.adapter.token = null
              this.redirect('welcome')
            }
        }
    }


    get staticHTML(){

        if(this.is_authenticated){
            return (`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">DogWalkers</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" id="profile-link" href="#">Profile <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="walks-link" href="#">Walks</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="walkersHire-link" href="#">Walkers for hire</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="logout-link" href="#">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
            `)
        }else{
            return (`
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">DogWalkers</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" id="welcome-link" href="#">Welcome <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="login-link" href="#">Log In</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="signup-link" href="#">Sign up</a>
                </li>
              </ul>
            </div>
          </nav>
            `)
        }

    }

}