class App{

    constructor(container){
        this.container = container
        this.massSelector = new MassSelector()
        this.universe = new Universe()
        this.universe.addMassCallback = this.universeAddMassCallback.bind(this)
    }   

    universeAddMassCallback(){
        return this.massSelector.selectedMass
    }


}