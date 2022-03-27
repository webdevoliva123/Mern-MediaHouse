import {createStore} from 'redux'
import comAllReducer from './combineReducer/combineReducer';

const store = createStore(comAllReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;