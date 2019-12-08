class App{

    constructor(){
        this.adapter = new BaseAdapter()
        this.initBindingsAndEventListeners()
        this.renderPage(new SignupPage(this.pageContainer, this.adapter))
    }

    initBindingsAndEventListeners(){
        this.container = document.querySelector('#app-container')
        this.alertsContainer = document.querySelector('#alert-container')
        this.navbarContainer = document.querySelector('#navbar-container')
        this.pageContainer = document.querySelector('#page-container')
    }

    renderPage(page){
        page.render()
    }

}