import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { onlineUserReducer } from './reducers/allOnlineUserReducer';
import { allUserSearchReducer } from './reducers/allSearchUserReducer';
import { authReducer } from './reducers/authReducers';
import { callReducer } from './reducers/callReducer';
import { groupReducer } from './reducers/groupReducer';
import { messageNotificationPush } from './reducers/messageNotificationReducer';
import { messageReducer } from './reducers/messageReducer';
import { myProfileReducer } from './reducers/profileReducer';
import { selectedChatReducer } from './reducers/selectedChatReducer';
import { themeReducer } from './reducers/ThemeReducer';
import { uploadReducer } from './reducers/uploadReducer';
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
    call: callReducer,
});
const middleware = [thunk];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    // composeWithDevTools()
))
export default store;