import {AUTHORS_LOADED} from "../constants/action-types"
import createEntitiesLoadedWithNamedType from './commonReducer'
const initialState = {
    byId:{
    }
}

export {initialState}

//reducer
export default createEntitiesLoadedWithNamedType(initialState, 'AUTHORS')