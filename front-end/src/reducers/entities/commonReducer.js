function entitiesArrayToObjectWithIdAsKey(entitiesArray){
    return entitiesArray.reduce((entityById, entity) => {
        entityById[entity.id] = entity
        return entityById
    }, {})
}

//higher-order reducer
export default function createEntitiesLoadedWithNamedType(initialState, entityName = '') {
    return (state = initialState, action) => {
      switch (action.type) {
        case `${entityName}_LOADED`:
            return { ...state, byId: entitiesArrayToObjectWithIdAsKey(action.payload) }
        default:    
          return state
      }
    }
  }
