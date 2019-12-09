class ProfilePage extends PageManager{

    constructor(container, adapter){
        super(container)
        this.adapter = new ProfileAdapter(adapter)
        this.owner = null
    }

    initBindingsAndEventListeners(){
        return null
    }

    profileBindingsAndEventListeners(){
        const dogList = this.container.querySelector('ul')
        dogList.addEventListener('click', this.handleDogClick.bind(this))
    }

    dogBindingsAndEventListeners(){
        const editButton = this.container.querySelector('button')
        editButton.addEventListener('click', this.formalizeDog.bind(this))
    }

    dogFormBindingsAndEventListeners(){
        const form = this.container.querySelector('form')
        form.addEventListener('submit', this.handleUpdateDog.bind(this))
    }

    handleDogClick(e){
        if(e.target.tagName === "A"){
            const dogId = e.target.dataset.id 
            const dog = this.getDogById(dogId)
            this.renderDog(dog)
        }
    }

    formalizeDog(e){
        const id = e.target.dataset.id
        const dog = this.owner.dogs.find(d => d.id == id)
        if(dog){
            this.container.innerHTML = dog.formHTML
            this.dogFormBindingsAndEventListeners()
        }else{
            this.handleError({
                type: "404 Not Found",
                msg: "Dog was not found"
            })
        }
    }

    async handleUpdateDog(e){
        e.preventDefault()
        const [id, name, breed, walkTime] = Array.from(e.target.querySelectorAll('input')).map(i => i.value)
        const notes = e.target.querySelector('textarea').value

        const params = { name, breed, walkTime, notes, id }
        const dog = this.getDogById(id)
        const oldDog = new Dog({id, name, breed, notes, walkTime})
        dog.name = name
        dog.breed = breed
        dog.walkTime = walkTime
        dog.notes = notes
        this.renderDog(dog)
        try{
            const {id, name, breed, walkTime, notes} = await this.adapter.updateDog(params)
        }catch(err){
            dog.name = oldDog.name
            dog.breed = oldDog.breed
            dog.walkTime = oldDog.walkTime
            dog.notes = oldDog.notes
            this.renderDog(dog)
            this.handleError(err)
        }
        
    }

    async fetchAndRenderPageResources(){
        try{
            const ownerObj = await this.adapter.getOwner()
            this.owner = new Owner(ownerObj)
            this.renderOwner()
        }catch(err){
            this.handleError(err)
        }
        
    }


    getDogById(id){
        return this.owner.dogs.find(d => d.id == id)
    }

    get staticHTML(){
        return (`
            <div class="loader"></div>
        `)
    }

    renderDog(dog){
        if(dog){
            this.container.innerHTML = dog.showHTML
            this.dogBindingsAndEventListeners()
        }else{
            this.handleError({
                type: "404 Not Found",
                msg: "Dog was not found"
            })
        }
    }

    renderOwner(){
        this.container.innerHTML = this.owner.profileHTML
        this.profileBindingsAndEventListeners()
    }

}