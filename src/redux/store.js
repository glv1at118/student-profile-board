import { createStore, applyMiddleware, compose } from 'redux';
import myReducer from './reducers.js';
import myThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const reduxStore = createStore(myReducer, composeEnhancers(
    applyMiddleware(myThunk)
));