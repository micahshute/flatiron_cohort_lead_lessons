

class Pokemon{


    constructor(id, name, types){
        this.id = id
        this.name = name
        this.types = types
    }



    get HTML(){

        return(`
            <div class="pokemon-card">

                <h3>${this.id} - ${this.name}</h3>
                <ul>
                    ${this.createTypeLIs()}
                </ul>
            </div>
        `)

    }


    createTypeLIs(){

        return this.types.map(type => {
            return `<li>${type}</li>`
        }).join('')
    }
}


const arcanine = new Pokemon(182, 'Acranine', ['Fire', 'Water'])

console.log(arcanine.HTML)