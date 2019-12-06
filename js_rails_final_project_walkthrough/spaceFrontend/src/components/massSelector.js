class MassSelector{

    constructor(){
        this.masses = []
        this.initBindingsAndEventListeners()
        this.fetchAndLoadMasses()
        this.selectedMass = null
    }


    initBindingsAndEventListeners(){
        this.container = document.querySelector('#mass-selector')
        this.allMassesContainer = document.querySelector('#all-masses')
        this.form = document.querySelector('#add-mass-form')

        this.allMassesContainer.addEventListener('click', this.selectMassHandler.bind(this))
    }

    selectMassHandler(e){
        // update this.selectedMass
        if(e.target.classList.contains('select-mass')){
            const id = parseInt(e.target.dataset.id)
            const selection = this.masses.find(mass => mass.id === id)
            if(selection === this.selectedMass){
                e.target.parentElement.style.background = "#fffff0"
                this.selectedMass = null
            }else if(this.selectedMass !== null){
                const massContainer = Array.from(this.allMassesContainer.children).find(con => {
                    const button = con.querySelector('button.select-mass')
                    return button.dataset.id == this.selectedMass.id
                })
                massContainer.style.background = "#fffff0"
                e.target.parentElement.style.background = 'white'
                this.selectedMass = selection
            }else{
                e.target.parentElement.style.background = 'white'
                this.selectedMass = selection
            }
        }
    }

    async fetchAndLoadMasses(){

        this.masses = await Mass.retrieveAll()
        this.render()

    }


    render(){
        this.allMassesContainer.innerHTML = this.masses.map(mass => mass.htmlWithLabel).join('')
    }

}