import { ADD_VILLAIN, ARREST_VILLAIN } from '../actionTypes'

export function villainsReducer(state=[], action){


    switch(action.type){
        case ADD_VILLAIN:
            return [...state, action.payload]
        case ARREST_VILLAIN:
            return state.filter(v => v.name !== action.payload.name)
        default:
            return state
    }
}