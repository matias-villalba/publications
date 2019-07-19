import { combineReducers } from 'redux'
import  navigation, {navigationState} from './navigation'
import publications, {publicationsState} from './publications'
import searchFilter, {searchFilterState} from './searchFilter'

const initialState = {
    searchFilter: searchFilterState,
    publications: publicationsState,
    navigation: navigationState
}

export {initialState}
export default combineReducers({
    searchFilter,
    publications,
    navigation
})