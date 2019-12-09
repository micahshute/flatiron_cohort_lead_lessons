class PageManager{


    constructor(container){
        this.container = container    
    }

    fetchAndRenderPageResources(){
        return null
    }

    handleError(err){
        if(err.type === "Authorizaiton Error"){
            this.handleAlert(err.msg)
            this.redirect('welcome')
        }else{
            this.handleAlert(err)
        }
    }

    render(){
        this.container.innerHTML = this.staticHTML
        this.initBindingsAndEventListeners()
        this.fetchAndRenderPageResources()
    }

}