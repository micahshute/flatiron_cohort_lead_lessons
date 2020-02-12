import { moriartyLocationReducer} from './moriartyLocation'
import { villainsReducer } from './villains'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    villains: villainsReducer,
    moriartyLocations: moriartyLocationReducer
})

export default rootReducer