import { configureStore } from "@reduxjs/toolkit";
import { onConversationListSlice } from "./conversation.slice";

const store = configureStore({
    reducer: {
        conversation: onConversationListSlice.reducer,

    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store