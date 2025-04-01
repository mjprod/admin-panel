import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./slice/conversation.slice";
import categoryReducer from "./slice/category.slice";
import languageReducer from "./slice/language.slice";
import statusReducer from "./slice/status.slice";
import paginationReducer from "./slice/pagination.slice";
import loadingReducer from "./slice/loading.slice";
import authReducer from "./slice/auth.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
    category: categoryReducer,
    language: languageReducer,
    status: statusReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
