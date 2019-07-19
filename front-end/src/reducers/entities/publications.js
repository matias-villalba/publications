import createEntitiesLoadedWithNamedType from './commonReducer'
const initialState = {
    byId:{
    }
}

export {initialState}
//reducer
export default createEntitiesLoadedWithNamedType(initialState, 'PUBLICATIONS')