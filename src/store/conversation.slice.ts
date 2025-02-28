import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllConversation } from "../api/auth";
import { Conversation } from "../util/ExampleData";

interface onConversationState {
  conversationList: Conversation[];
}

const initialState: onConversationState = {
  conversationList: [],
};

export const onConversationListSlice = createSlice({
  name: "on-conversation",
  initialState: initialState,
  reducers: {
    setConversationList: (state, action: PayloadAction<Conversation[]>) => {
      state.conversationList = action.payload;
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log(`-----Answer----: ${action.payload.answer}`);
      const convers = state.conversationList.findIndex(
        (con) => con.id == action.payload.id
      );
      state.conversationList[convers] = action.payload;
    },
  },
});

export const getConversationList = () => {
  return async (dispatch: any) => {
    try {
      const res = await AllConversation();
      if (res != null) {
        console.log(`----id: ${res[0].id}`);
        dispatch(onConversationActions.setConversationList(res));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const onConversationActions = onConversationListSlice.actions;

export default onConversationListSlice.reducer;
