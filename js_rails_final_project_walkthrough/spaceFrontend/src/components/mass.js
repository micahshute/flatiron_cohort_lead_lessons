class Mass{

    // Meter / pixel ratio

    static get sizeRatio(){
        return (1 / 250000)
    }

    // max pixel size
    static get maxPixelSize(){
        return 200
    }

    // min pixel size
    static get minPixelSize(){
        return 1
    }

    static async retrieveAll(){

        try{
            const massObjs = await MassAdapter.instance.getMasses()
            return massObjs.map(obj => new this(obj))
        }catch(err){
            alert(`The request failed with error ${err}`)
            return null
        }
    }


    constructor(params){
        const { id, name, radius, mass } = params
        this.id = id
        this.name = name
        this.radius = radius
        this.mass = mass
    }


    get pixelSize(){
        return this.radius * 2 * Mass.sizeRatio
    }


    get alteredPixelSize(){
        let pixelSize = this.pixelSize
        if(pixelSize > Mass.maxPixelSize){
            pixelSize = Mass.maxPixelSize
        }else if(pixelSize < Mass.minPixelSize){
            pixelSize = Mass.minPixelSize
        }
        return pixelSize
    }

    get htmlWithLabel(){
        return (`
            <div class="mass-border">
                ${this.htmlPicture()}
                <ul>
                    <li>Name: ${this.name}</li>
                    <li>Radius: ${this.radius} m</li>
                    <li>Mass: ${this.mass} kg</li>
                </ul>
                <button class="select-mass" data-id="${this.id}">Select</button>
            </div>
        `)
    }


    htmlPicture(styleInsert = ''){
        return(`
            <div class="circle" style="height: ${this.alteredPixelSize}px; width: ${this.alteredPixelSize}px; ${styleInsert}" >
            </div>
        `)
    }

}