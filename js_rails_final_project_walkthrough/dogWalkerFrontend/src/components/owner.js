class Owner{
    constructor(owner){
        const { id, email, name, address, dogs } = owner
        this.id = id
        this.email = email
        this.name = name
        this.address = address
        this.dogs = dogs.map(d => new Dog(d))
    }


    get profileHTML(){
        return (`
            <h2>Welcome ${this.name}! </h2>
            <h3>Your dogs:</h3>
            <ul>
                ${this.dogs.map(d => d.liAndLinkHTML).join('')}
            </ul>
        `)
    }
}