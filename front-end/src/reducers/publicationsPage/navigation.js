import {ITEMS_PER_PAGE, DEFAULT_NEWEST_FIRST} from "../constants/configs" 
import {CLEAR_PAGE_PARAMS_AUTHOR_ID, PUT_PAGE_PARAMS_AUTHOR_ID, PUT_ORDER_PARAMS, PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS} from "../constants/action-types"

const initialState = {
    buttons: {
      nextPageIsActive: true,
      previousPageIsActive: false        
    },
    queryParams:{
      nextPageParams:{
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        sinceOrUntilDatetime: 'until',
        newestFirst: DEFAULT_NEWEST_FIRST
      },
      previousPageParams:{
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        sinceOrUntilDatetime: 'since',
        newestFirst: !DEFAULT_NEWEST_FIRST
      },
      firstPageParams: {
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        newestFirst: DEFAULT_NEWEST_FIRST,        
      },
      lastPageParams: {
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        newestFirst: !DEFAULT_NEWEST_FIRST
      }

    }

  } 
export {
    initialState
}

export default (state = initialState, action) => {
    switch(action.type){

        case 'PAGE.NAVIGATION.QUERY_PARAMS.UPDATE_AUTHOR_ID' :
            return { ...state,
                queryParams: {
               ...state.queryParams,
                 nextPageParams:{
                 ...state.queryParams.nextPageParams,
                   authorId: action.payload
                 },
      
                 previousPageParams:{
                   ...state.queryParams.previousPageParams,
                     authorId: action.payload
                 },
                 firstPageParams:{
                   ...state.queryParams.firstPageParams,
                     authorId: action.payload
                 },
                 lastPageParams:{
                   ...state.queryParams.lastPageParams,
                     authorId: action.payload
                 }
      
               }
           }          

      
        case 'PAGE.NAVIGATION.QUERY_PARAMS.UPDATE_ORDER':
            return {
              ...state,
              queryParams: {
                ...state.queryParams,
                nextPageParams:{
                  ...state.queryParams.nextPageParams,
                  sinceOrUntilDatetime: action.payload.nextPageParams.sinceOrUntilDatetime,
                  newestFirst: action.payload.nextPageParams.newestFirst
                },
                previousPageParams:{
                  ...state.queryParams.previousPageParams,
                  sinceOrUntilDatetime: action.payload.previousPageParams.sinceOrUntilDatetime,
                  newestFirst: action.payload.previousPageParams.newestFirst
                },
                firstPageParams:{
                  ...state.queryParams.firstPageParams,
                  newestFirst: action.payload.firstPageParams.newestFirst
                },
                lastPageParams:{
                  ...state.queryParams.lastPageParams,
                  newestFirst: action.payload.lastPageParams.newestFirst
                }
                      
              }
            }
            case 'PAGE.NAVIGATION.UPDATE_ACTIVATION_STATE_OF_NEXT_AND_PREVIOUS_BUTTONS' :             
                return {...state, buttons: {...state.buttons, ...action.payload}}


        case 'PAGE.NAVIGATION.QUERY_PARAMS.UPDATE_ID_AND_DATE_OF_DELIMITER_PUBLICATION' :

            return {
              ...state,
              queryParams: {
                ...state.queryParams,
                nextPageParams:{
                  ...state.queryParams.nextPageParams,
                  delimiterItemId: action.payload.nextPageParams.delimiterItemId,
                  datetime: action.payload.nextPageParams.datetime
                },
                previousPageParams:{
                  ...state.queryParams.previousPageParams,
                  delimiterItemId: action.payload.previousPageParams.delimiterItemId,
                  datetime: action.payload.previousPageParams.datetime
                }
      
              }
            }
//            case 'PAGE.NAVIGATION.BUTTONS.PUT_ACTIVATION_STATE_OF_NEXT_AND_PREVIOUS_PAGE' :

        default:
            return state
    }

}