import {CHANGE_PUBLICATIONS_ORDER, ADD_ARTICLE, NEXT_DATA_LOADED, PREVIOUS_DATA_LOADED } from "../constants/action-types";
import axios from "axios";

  export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
  }

  export function changePublicationsOrder(payload) {
    return { type: CHANGE_PUBLICATIONS_ORDER, payload }
  }
  
  
  
  export function getAuthors() {
    return function(dispatch) {
      axios.get('http://localhost:3000/authors')
        .then(response => {
          dispatch({ type: "AUTHORS_LOADED", payload: response.data })
        })
    }
  }


export function getData(payload) {
    return function(dispatch) {
      axios.get('http://localhost:3000/publications', {
        params:payload
      })
        .then(response => {
          dispatch({ type: "NEWEST_DATA_LOADED", payload: response.data })
        })
    }
  }
  
  export function loadNextPublications(payload) {
    return function(dispatch) {
      axios.get('http://localhost:3000/publications', {
        params: payload
      })
        .then(response => {
          dispatch({ type: NEXT_DATA_LOADED, payload: response.data })
        })
    }
  }

  export function loadPreviousPublications(payload) {
    return function(dispatch) {
      axios.get('http://localhost:3000/publications', {
        params: payload
      })
        .then(response => {
          dispatch({ type: PREVIOUS_DATA_LOADED, payload: response.data })
        })
    }
  }

  
