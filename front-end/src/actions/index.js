import {CLEAR_AUTHOR_DATA, PUT_AUTHOR_DATA, CHANGE_PUBLICATIONS_ORDER, NEXT_DATA_LOADED, PREVIOUS_DATA_LOADED } from "../constants/action-types";
import axios from "axios";


const HOST = process.env.REACT_APP_API_HOST_AND_PORT

  export function clearAuthorCard(payload) {
    return { type: CLEAR_AUTHOR_DATA, payload }
  }

  export function putAuthorData(payload) {
    return { type: PUT_AUTHOR_DATA, payload }
  }

  export function changePublicationsOrder(payload) {
    return { type: CHANGE_PUBLICATIONS_ORDER, payload }
  }
  
  export function searchPublicationsByTitle(payload) {
    return function(dispatch) {
      axios.get(HOST+'/publications/matches/titles', {
        params:payload
      })
        .then(response => {
          dispatch({ type: "SEARCH_DATA_LOADED", payload: response.data })
        })
    }
  }


  
  export function getAuthors() {
    return function(dispatch) {
      axios.get(HOST+'/authors')
        .then(response => {
          dispatch({ type: "AUTHORS_LOADED", payload: response.data })
        })
    }
  }


  export function getData(payload) {
    return function(dispatch) {
      axios.get(HOST+'/publications', {
        params:payload
      })
        .then(response => {
          dispatch({ type: "NEWEST_DATA_LOADED", payload: response.data })
        })
    }
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

  
