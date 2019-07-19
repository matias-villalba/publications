const initialState = {
    ids: [],  // publications ids ordered by publication date (these will be ordered only if order.active = true)
    order: {
      active: true,  // lo que antes era showingASearchResult ahora es active invertido
      showingNewestFirst: true,  // this is the publications order. True:newest publications first. False:oldest publications first
    }
}
export {
    initialState
}

//reducer
export default (state = initialState, action) => {
    switch(action.type){
        case 'PAGE.PUT_PUBLICATIONS_IDS':
            return {...state, ids: action.payload}
        case 'PAGE.PUBLICATIONS_ORDER.UPDATE_ACTIVATION_STATE':
            return {...state, order:
                                {...state.order, active: action.payload}
                }
        case 'PAGE.PUBLICATIONS_ORDER.UPDATE_NEWEST_FIRST_STATE':
            return {...state, order:
                                {...state.order, showingNewestFirst: action.payload}
                    }                            
        default:
            return state   
    }
}