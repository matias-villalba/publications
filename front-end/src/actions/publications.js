import {CLEAR_AUTHOR_DATA, PUT_AUTHOR_DATA, CHANGE_PUBLICATIONS_ORDER, NEXT_DATA_LOADED, PREVIOUS_DATA_LOADED } from "../constants/action-types";
import axios from "axios";
import {updateActivationStateOfNavButtons} from './pageNavButtons'
import {ITEMS_PER_PAGE} from "../constants/configs"

const HOST = process.env.REACT_APP_API_HOST_AND_PORT


export function fetchPublicationsByTitle(params) {
    return (dispatch) => {
      axios.get(`${HOST}/publications/matches/titles`, params?{params}:undefined )
        .then(response => {
          dispatch(loadPublicationsSuccess(response.data))
        }).catch((err) => {
          dispatch(loadPublicationsFailure(err))
        })
    }
}


export function determineButtonsStateForFirstPage(pagePublicationsCount){
  return {
    nextPageIsActive : (pagePublicationsCount < ITEMS_PER_PAGE)? false: true,
    previousPageIsActive: false
  }
}

//determine which buttons (next, previous) should be active after load next publications page
export function determineButtonsStateAfterNextPage(pagePublicationsCount){
  const buttons = {
    nextPageIsActive : (pagePublicationsCount < ITEMS_PER_PAGE)? false: true
  }
  if(pagePublicationsCount > 0){
    buttons.previousPageIsActive = true
  }
  return buttons
}

//determine which buttons (next, previous) should be active after load previous publications page
export function determineButtonsStateAfterPreviousPage(pagePublicationsCount){
  const buttons = {}
  if(pagePublicationsCount > 0){
    buttons.nextPageIsActive = true
  }
  if(pagePublicationsCount < ITEMS_PER_PAGE){
    buttons.nextPageIsActive = false
  }
  return buttons
}


const updateButtonsAndQueries = (publications) => {
  updateActivationStateOfNavButtons(determineButtonsStateForFirstPage(publications.length) )  //dispach action to update visibility of next and previous page buttons        
  //dispatch({type: PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS, payload: pagination} )
}

const createFetchActionWithPromisePayload = (actionType, url, params) => {
  return {
    type: actionType,
    payload: axios.get(url, params?{params}:undefined)  //returning a promise in payload it will be created actions with suffix: _PENDING, _FULFILLED and _REJECTED depending on the promise state
                                                        //This is managed by redux-promise-middleware module
  }    
}

export const fetchPublications = (payload) => (dispatch) => {
  const action = createFetchActionWithPromisePayload('FETCH_PUBLICATIONS',`${HOST}/publications`, payload)
  action.payload.then(response => updateButtonsAndQueries(response.payload))  //TODO add error handler
  return action
}




export function loadNextPublications(payload) {
  return function(dispatch) {
    axios.get(HOST+'/publications', {
      params: payload
    })
      .then(response => {
        dispatch({ type: NEXT_DATA_LOADED, payload: response.data })
      })
  }
}

export function loadPreviousPublications(payload) {
  return function(dispatch) {
    axios.get(HOST+'/publications', {
      params: payload
    })
      .then(response => {
        dispatch({ type: PREVIOUS_DATA_LOADED, payload: response.data })
      })
  }
}
