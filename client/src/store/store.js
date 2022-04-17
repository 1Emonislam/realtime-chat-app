import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';
import { groupReducer } from './reducers/groupReducer';
import { messageReducer } from './reducers/messageReducer';
import { singleChatMemberReducer } from './reducers/singleChatMemberReducer';
import { themeReducer } from './reducers/ThemeReducer';
const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    singleGroupMembers: singleChatMemberReducer,
    groupData: groupReducer,
    groupMessage: messageReducer,
});
const middleware = [thunk];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store;