import { ADD_VILLAIN, ARREST_VILLAIN } from '../actionTypes'

export function addVillain(villainObj){
    return {
        type: ADD_VILLAIN,
        payload: villainObj
    }
}

export function arrestVillain(villainObj){
    return{
        type: ARREST_VILLAIN,
        payload: villainObj
    }
}