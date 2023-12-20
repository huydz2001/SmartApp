import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from '../redux/reducers/index'


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunk]
const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(...middleware)))

export default store;