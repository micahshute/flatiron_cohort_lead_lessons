class Universe{

    static get MassDecorator(){
        return class{
            constructor(mass, location, velocity){
                this.location = location
                this.baseMass = mass
                this.velocity = velocity
                this.mass = mass.mass
                this.name = mass.name
                this.radius = mass.radius
            }


            get html(){
                const centerX = this.location.x
                const centerY = this.location.y
                const top = centerY - (this.baseMass.alteredPixelSize / 2) - 20
                const left = centerX - (this.baseMass.alteredPixelSize / 2) - 20
                return this.baseMass.htmlPicture(`position: absolute; top: ${top}px; left: ${left}px`)
            }
    
        }
    }

    constructor(){
        this.masses = []
        this.initBindingsAndEventListeners()
        this.physicsMachine = PhysicsMachine
        this.simulating = false
        this.simulationInterval = null
        this.speedRatioValue = 1
    }



    initBindingsAndEventListeners(){
        this.container = document.querySelector('#universe')
        this.simContainer = document.querySelector('#universe-sim')
        this.beginSimulationButton = document.querySelector('#begin-sim')
        this.initXVel = document.querySelector('#xvel')
        this.initYVel = document.querySelector('#yvel')
        this.clearSim = document.querySelector('#clear-sim')
        this.speedRatio = document.querySelector('#speed-ratio')


        this.simContainer.addEventListener('click', this.handleSimClick.bind(this))

    }

    addMass(mass, location){
        const velocity = {
            x: parseInt(this.initXVel.value),
            y: parseInt(this.initYVel.value)
        }
        const decMass = new Universe.MassDecorator(mass, location, velocity)
        this.masses.push(decMass)
        console.log(decMass)
        this.render()
    }


    handleSimClick(e){
        const x = e.offsetX
        const y = e.offsetY
        const mass = this.addMassCallback()

        if(mass){
            this.addMass(mass, {x, y})
        }
    }


    render(){
        this.simContainer.innerHTML = this.masses.map(m => m.html).join('')
    }


}