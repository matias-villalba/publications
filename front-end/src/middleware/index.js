
import {
  PUT_AUTHOR_DATA, CLEAR_AUTHOR_DATA, PUT_PAGE_PARAMS_AUTHOR_ID, CLEAR_PAGE_PARAMS_AUTHOR_ID
  , PUT_ORDER_PARAMS, CHANGE_PUBLICATIONS_ORDER, NEWEST_DATA_LOADED, PREVIOUS_DATA_LOADED, NEXT_DATA_LOADED, PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS } from '../constants/action-types'
import { ITEMS_PER_PAGE } from '../constants/configs'
import { getData } from '../actions'

export function loadAuthorPublications ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if (action.type === PUT_AUTHOR_DATA) {
        dispatch({ type: PUT_PAGE_PARAMS_AUTHOR_ID, payload: action.payload.id })
        dispatch(getData(getState().pagination.firstPageQuery))
      }
      return next(action)
    }
  }
}

export function loadAllAuthorPublications ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if (action.type === CLEAR_AUTHOR_DATA) {
        dispatch({ type: CLEAR_PAGE_PARAMS_AUTHOR_ID, payload: undefined })
        dispatch(getData(getState().pagination.firstPageQuery))
      }
      return next(action)
    }
  }
}

export function updatePublicationOrder ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      if (action.type === CHANGE_PUBLICATIONS_ORDER) {
        const newestFirst = action.payload

        const pagination = {
          nextButton: true,
          previousButton: false,

          nextPageQuery: {
            sinceOrUntilDatetime: (newestFirst ? 'until' : 'since'),
            newestFirst: newestFirst
          },
          previousPageQuery: {
            sinceOrUntilDatetime: (newestFirst ? 'since' : 'until'),
            newestFirst: !newestFirst
          },
          firstPageQuery: {
            newestFirst: newestFirst
          },
          lastPageQuery: {
            newestFirst: !newestFirst
          }
        }
        dispatch({ type: PUT_ORDER_PARAMS, payload: pagination })
        dispatch(getData(getState().pagination.firstPageQuery))
      }
      return next(action)
    }
  }
}

export function updatePreviousAndNextPageParams ({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const noPublications = !!(!action.payload || action.payload.length === 0)

      if (action.type === NEWEST_DATA_LOADED || action.type === NEXT_DATA_LOADED || action.type === PREVIOUS_DATA_LOADED) {
        let pagination = {}

        if (action.type === NEXT_DATA_LOADED || action.type === NEWEST_DATA_LOADED) {
          pagination = {

            nextButton: !((action.payload.length < ITEMS_PER_PAGE)),
            nextPageQuery: getState().pagination.nextPageQuery,
            previousPageQuery: getState().pagination.previousPageQuery
          }
          if (!noPublications) {
            pagination.nextPageQuery.delimiterItemId = (action.payload[action.payload.length - 1].id)
            pagination.nextPageQuery.datetime = (action.payload[action.payload.length - 1].publicationDatetime)

            pagination.previousPageQuery.delimiterItemId = (action.payload[0].id)
            pagination.previousPageQuery.datetime = (action.payload[0].publicationDatetime)
          }

          if (action.type === NEWEST_DATA_LOADED) {
            //            pagination.previousButton = getState().pagination.previousButton
            pagination.previousButton = false
          } else {
            pagination.previousButton = action.payload.length > 0 ? true : getState().pagination.previousButton
          }
        }

        if (action.type === PREVIOUS_DATA_LOADED) {
          pagination = {
            previousButton: (action.payload.length < ITEMS_PER_PAGE) ? false : getState().pagination.previousButton,
            nextButton: getState().pagination.nextButton,
            nextPageQuery: getState().pagination.nextPageQuery,
            previousPageQuery: getState().pagination.previousPageQuery
          }

          if (!noPublications) {
            pagination.nextButton = true

            pagination.nextPageQuery.delimiterItemId = (action.payload[0].id)
            pagination.nextPageQuery.datetime = (action.payload[0].publicationDatetime)

            pagination.previousPageQuery.delimiterItemId = (action.payload[action.payload.length - 1].id)
            pagination.previousPageQuery.datetime = (action.payload[action.payload.length - 1].publicationDatetime)
          }
        }

        dispatch({ type: PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS, payload: pagination })
      }

      return next(action)
    }
  }
}
