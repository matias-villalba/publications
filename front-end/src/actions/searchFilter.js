const boundResetSearchFilter = () => dispatch => dispatch(resetSearchFilter())
export {boundResetSearchFilter as resetSearchFilter} 


function resetSearchFilter() {
    return {
      type: 'RESET_SEARCH_FILTER'
    }
}