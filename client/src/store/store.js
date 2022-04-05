import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';
import { themeReducer } from './reducers/ThemeReducer';
const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer
});
const middleware = [thunk];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store;