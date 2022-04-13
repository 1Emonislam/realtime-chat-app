import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';
import { groupReducer } from './reducers/groupReducer';
import { themeReducer } from './reducers/ThemeReducer';
const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    groupData: groupReducer, 
});
const middleware = [thunk];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store;