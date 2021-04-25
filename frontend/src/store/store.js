import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from "./reducers/cartReducer";
// import { orderReducer } from "./reducers/orderReducer";
import reducer from './reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    combineReducers({
        cart: cartReducer,
        auth: reducer,
        // order: orderReducer,
    }),
    composeEnhances(applyMiddleware(thunk))
);
export default store;