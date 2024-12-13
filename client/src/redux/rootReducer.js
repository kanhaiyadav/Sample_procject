import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import todoSlice from "./Slice/TodoSlice/TodoSlice";
import userSlice from "./Slice/userSlice/userSlice";

const appReducer = combineReducers({
    todo: todoSlice,
    user: userSlice,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;  // Reset the state to initial state
    }
    return appReducer(state, action);
};


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['todo', 'user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;