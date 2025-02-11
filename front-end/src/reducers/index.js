import { combineReducers } from 'redux'
import entities, {entitiesState}  from './entities'
import publicationsPage, {publicationsPageState}  from './publicationsPage'

import {CLEAR_PAGE_PARAMS_AUTHOR_ID, PUT_PAGE_PARAMS_AUTHOR_ID, CLEAR_AUTHOR_DATA, PUT_AUTHOR_DATA, PUT_ORDER_PARAMS, CHANGE_PUBLICATIONS_ORDER, AUTHORS_LOADED, SEARCH_DATA_LOADED, NEXT_DATA_LOADED ,NEWEST_DATA_LOADED, PREVIOUS_DATA_LOADED, PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS} from "../constants/action-types"
import {ITEMS_PER_PAGE, DEFAULT_NEWEST_FIRST} from "../constants/configs" 


const initialState = {
  publicationsPage: publicationsPageState, 
  entities: entitiesState
}

export default combineReducers({
    publicationsPage,
    entities
  })

/*
const initialSta = {
  publicationsPage: {
    searchFilter:{
      searchByTitleIsActive: true, 
      selectedAuthorId: undefined,  // if it is undefined then page will have publications of any author
    },

    publications:{
      ids: [],  // publications ids ordered by publication date (these will be ordered only if order.active = true)
      order: {
        active: true,  // lo que antes era showingASearchResult ahora es active invertido
        showingNewestFirst: true,  // this is the publications order. True:newest publications first. False:oldest publications first
      },
    },
//    showingASearchResult: false,
    navigation:{
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
  },
  entities: {
    authors: {
      byId:{
      }
    },
    publications: {
      byId:{
      }
    }
  }

}
//-------------



const initialState = {
    authors: [],

    currentAuthor:{},

    remotePublications: [],
    
    showingASearchResult: false,
    showNewestPublicationsFirst: true,
    
    pagination: {
      nextButton:true,
      previousButton:false,

      nextPageQuery:{
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        sinceOrUntilDatetime: 'until',
        newestFirst: DEFAULT_NEWEST_FIRST
      },
      previousPageQuery:{
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        sinceOrUntilDatetime: 'since',
        newestFirst: !DEFAULT_NEWEST_FIRST
      },
      firstPageQuery: {
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        newestFirst: DEFAULT_NEWEST_FIRST,        
      },
      lastPageQuery: {
        authorId: undefined,
        itemsPerPage: ITEMS_PER_PAGE,
        newestFirst: !DEFAULT_NEWEST_FIRST
      }
    }

  };
  function rootReducer(state = initialState, action) {

    if (action.type === SEARCH_DATA_LOADED) {
      return { ...state,
                showingASearchResult: true, 
                remotePublications: action.payload }      
    }    

    if (action.type === AUTHORS_LOADED) {      
      return { ...state, authors: action.payload }
    }
    if (action.type === CHANGE_PUBLICATIONS_ORDER) {      
      return { ...state, showNewestPublicationsFirst: action.payload }
    }
 

    if (action.type === PUT_AUTHOR_DATA) {      
      return { ...state,
                 currentAuthor: action.payload
              }

    }    

    if (action.type === CLEAR_AUTHOR_DATA) {      
      return { ...state,
               currentAuthor: {}
              }
    }
    if(action.type === PUT_PAGE_PARAMS_AUTHOR_ID){
      return { ...state,
        pagination: {
         ...state.pagination,
           nextPageQuery:{
           ...state.pagination.nextPageQuery,
             authorId: action.payload
           },

           previousPageQuery:{
             ...state.pagination.previousPageQuery,
               authorId: action.payload
           },
           firstPageQuery:{
             ...state.pagination.firstPageQuery,
               authorId: action.payload
           },
           lastPageQuery:{
             ...state.pagination.lastPageQuery,
               authorId: action.payload
           }

         }
     }


    }
    if(action.type === CLEAR_PAGE_PARAMS_AUTHOR_ID){
      return { ...state,
                pagination: {
                ...state.pagination,
                  nextPageQuery:{
                  ...state.pagination.nextPageQuery,
                    authorId: undefined
                  },

                  previousPageQuery:{
                    ...state.pagination.previousPageQuery,
                      authorId: undefined
                  },
                  firstPageQuery:{
                    ...state.pagination.firstPageQuery,
                      authorId: undefined
                  },
                  lastPageQuery:{
                    ...state.pagination.lastPageQuery,
                      authorId: undefined
                  }
                }
              }

    }

    if (action.type === NEWEST_DATA_LOADED) {      
        return { ...state,
                    showingASearchResult: false, 
                    remotePublications: action.payload }
    }

    if (action.type === NEXT_DATA_LOADED) {
      return (!action.payload || action.payload.length === 0)? 
                { ...state,
                  showingASearchResult: false}
                  : 
                { ...state,
                  showingASearchResult: false, 
                  remotePublications: action.payload }
    }
    if (action.type === PREVIOUS_DATA_LOADED) {            
      return (!action.payload || action.payload.length === 0)?
            { ...state,
              showingASearchResult: false}
             :
            { ...state,
              showingASearchResult: false, 
              remotePublications: action.payload.reverse() }
    }

    if (action.type === PUT_ORDER_PARAMS) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          nextPageQuery:{
            ...state.pagination.nextPageQuery,
            sinceOrUntilDatetime: action.payload.nextPageQuery.sinceOrUntilDatetime,
            newestFirst: action.payload.nextPageQuery.newestFirst
          },
          previousPageQuery:{
            ...state.pagination.previousPageQuery,
            sinceOrUntilDatetime: action.payload.previousPageQuery.sinceOrUntilDatetime,
            newestFirst: action.payload.previousPageQuery.newestFirst
          },
          firstPageQuery:{
            ...state.pagination.firstPageQuery,
            newestFirst: action.payload.firstPageQuery.newestFirst
          },
          lastPageQuery:{
            ...state.pagination.lastPageQuery,
            newestFirst: action.payload.lastPageQuery.newestFirst
          },
          previousButton: action.payload.previousButton,
          nextButton: action.payload.nextButton
          

        }
      }


    }

    if (action.type === PUT_NEXT_AND_PREVIOUS_PAGE_PARAMS) {      

      return {
        ...state,
        pagination: {
          ...state.pagination,
          nextPageQuery:{
            ...state.pagination.nextPageQuery,
            delimiterItemId: action.payload.nextPageQuery.delimiterItemId,
            datetime: action.payload.nextPageQuery.datetime
          },
          previousPageQuery:{
            ...state.pagination.previousPageQuery,
            delimiterItemId: action.payload.previousPageQuery.delimiterItemId,
            datetime: action.payload.previousPageQuery.datetime
          },
          previousButton: action.payload.previousButton,
          nextButton: action.payload.nextButton
          

        }
      }
      
    } 
    
    


    return state;
  };
  export default rootReducer;

  */