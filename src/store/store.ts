import { configureStore } from "@reduxjs/toolkit";
import { onConversationListSlice } from "./conversation.slice";
import paginationReducer from "./pagination.slice";
import { onContextSlice } from "./context.slice";
import { onPromptSlice } from "./prompt.slice";

const store = configureStore({
  reducer: {
    conversation: onConversationListSlice.reducer,
    pagination: paginationReducer,
    context: onContextSlice.reducer,
    prompt: onPromptSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
