const initialState = {
    searchByTitleIsActive: true, 
    selectedAuthorId: undefined,  // if it is undefined then page will have publications of any author
}

export {
    initialState
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_SEARCH_FILTER':
            return {...state, searchByTitleIsActive: action.payload.searchByTitleIsActive,
                              selectedAuthorId: action.payload.selectedAuthorId}
        default:
            return state
    }

}