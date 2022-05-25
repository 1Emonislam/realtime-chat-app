import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducers';
import { groupReducer } from './reducers/groupReducer';
import { messageNotificationPush } from './reducers/messageNotificationReducer';
import { messageReducer } from './reducers/messageReducer';
import { selectedChatReducer } from './reducers/selectedChatReducer';
import { themeReducer } from './reducers/ThemeReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { onlineUserReducer } from './reducers/allOnlineUserReducer';
import { allUserSearchReducer } from './reducers/allSearchUserReducer';
import { uploadReducer } from './reducers/uploadReducer';
import { myProfileReducer } from './reducers/profileReducer';
const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    selectedChat: selectedChatReducer,
    groupData: groupReducer,
    groupMessage: messageReducer,
    notification: messageNotificationPush,
    onlineUser: onlineUserReducer,
    allSearch: allUserSearchReducer,
    uploads: uploadReducer,
    profile: myProfileReducer,
});
const middleware = [thunk];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    composeWithDevTools()
))
export default store;