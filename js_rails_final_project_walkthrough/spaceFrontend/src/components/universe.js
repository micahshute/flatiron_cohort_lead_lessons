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
                this.speedRatioValue = 1
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
        this.beginSimulationButton.addEventListener('click', this.toggleSimHandler.bind(this))
        this.speedRatio.addEventListener('change', this.changeSpeedRatio.bind(this))
        this.clearSim.addEventListener('click', this.clearSimulation.bind(this))
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

    toggleSimHandler(e){
        if(this.simulating){
            this.simulating = false
            clearInterval(this.simulationInterval)
            e.target.innerText = 'Begin Simulation'
        }else{
            this.simulating = true
            e.target.innerText = 'Stop Simulation'
            this.simulationInterval = setInterval(this.simulationUpdater.bind(this), 1)
        }
    }

    simulationUpdater(){
        const massForces = this.masses.map(m => ({
            mass: m, 
            force: this.physicsMachine.allForcesForMass(m, this.masses)
        }))
        for(let massForce of massForces ){
            this.physicsMachine.updateMass(massForce.mass, massForce.force, this.speedRatioValue)
        }
        this.render()
    }

    changeSpeedRatio(e){
        const newRatio = parseInt(e.target.value)
        if(newRatio > 0){
            this.speedRatioValue = newRatio
        }
    }

    clearSimulation(){
        this.masses = []
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