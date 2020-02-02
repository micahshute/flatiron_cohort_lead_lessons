import { OptimisticFetch } from './optimisticFetch'
import { PessimisticFetch } from './pessimisticFetch'

export default class APIManager{

    constructor(){
        this._handleError = (err) => {console.log(err)}
    }

    get headers(){
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    get handleError(){
        return this._handleError
    }

    set handleError(errorInstructions){
        this._handleError = errorInstructions
    }

    //setupCleanup: Function that runs the necessary code to start some sort of loader. 
        // it returns a function that will be run to stop the loader
    // 
    pessimistic(setupCleanup = () => {return false}){
        return new PessimisticFetch(setupCleanup, this.headers, this.handleError)
        
    } 


}