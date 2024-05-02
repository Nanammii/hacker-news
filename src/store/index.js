import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {dataProcess} from "./data-process.js";

const rootReducer = combineReducers({
    news: dataProcess.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({thunk: true})
})