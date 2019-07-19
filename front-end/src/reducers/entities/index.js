import { combineReducers } from 'redux'
import authors, {authorsState} from './authors'
import publications, {publicationsState} from './publications'

const initialState = {
    authors: authorsState,
    publications: publicationsState
}

export {initialState}
export default combineReducers({
    authors,
    publications
})
