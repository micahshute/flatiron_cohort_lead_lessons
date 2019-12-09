class Dog{

    static formHTML(dog){
        return (`
        <form id="${dog ? 'edit' : 'new'}-dog-form">
            ${dog ? '<input type="hidden" value="' + dog.id + '">' : '' }
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" value=${dog ? dog.name : ''} required >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="breed">Breed</label>
                    <input type="text" class="form-control" id="breed" placeholder="Breed" value=${dog ? dog.breed : ''} required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="walk-time">Walk Time</label>
                    <input type="text" class="form-control" id="walk-time" placeholder="Walk Time" value=${dog ? dog.walkTime : ''} required >
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="notes">Notes</label>
                    <textarea class="form-control" id="notes" rows="3">${dog ? dog.notes : ''}</textarea>
                </div>
            </div>
           <button type="submit" class="btn btn-primary">${dog ? 'Update' : 'Create'} Dog</button>
        </form>
        `)
    }

    constructor(dog){
        const { id, breed, name, notes, walk_time } = dog
        this.id = id
        this.breed = breed
        this.name = name
        this.notes = notes
        this.walkTime = walk_time
    }

    get formHTML(){
        return Dog.formHTML(this)
    }

    get showHTML(){
        return (`
            <h2>${this.name}</h2>
            <h3>${this.breed}</h3>
            <h3>Walk Time: ${this.walkTime}</h3>
            <p>Notes: \n${this.notes ? this.notes : "None"}</p>
            <button data-id=${this.id}  id="edit-dog">Edit</button>
        `)
    }

    get liAndLinkHTML(){
        return `<li><a href="#" data-id="${this.id}">${this.name} - ${this.breed}</a></li>`
    }
}