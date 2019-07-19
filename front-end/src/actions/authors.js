import axios from "axios";

const HOST = process.env.REACT_APP_API_HOST_AND_PORT

export function fetchAuthors() {
    return (dispatch) => {
      axios.get(`${HOST}/authors`)
        .then(response => {
          dispatch(loadAuthorsSuccess(response.data))
        }).catch((err) => {
          dispatch(loadAuthorsFailure(err))
        })
    }
  }


function loadAuthorsFailure(error) {
    return {
      type: 'LOAD_AUTHORS_FAILURE',
      error
    }
}

function loadAuthorsSuccess(authors) {
    return {
      type: 'LOAD_AUTHORS_SUCCESS',
      payload:authors
    }
}