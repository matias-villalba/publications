import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import {loadAuthorPublications, loadAllAuthorPublications, updatePublicationOrder, updatePreviousAndNextPageParams } from "../middleware";
import thunk from "redux-thunk";
import promiseMiddleware from 'redux-promise-middleware'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk, promiseMiddleware, updatePublicationOrder, updatePreviousAndNextPageParams, loadAuthorPublications, loadAllAuthorPublications))
);

export default store;
