import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../util/ExampleData";
import { AllConversation } from "../api/auth";


interface onConversationState {
 conversationList: Conversation[]
 
}


const initialState: onConversationState = {
  conversationList : [],
  
};


export const onConversationListSlice = createSlice({
  name: "on-conversation",
  initialState: initialState,
  reducers: {
    setConversationList: (state, action: PayloadAction<Conversation[]>) => {
      state.conversationList = action.payload;
    },
  },
});


export const getConversationList = () => {
  return async (dispatch: any) => {
    try {
      const res = await AllConversation("");
      if (res != null) {
        console.log(`----id: ${res[0].id}`)
        dispatch(onConversationActions.setConversationList(res));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const onConversationActions = onConversationListSlice.actions;

export default onConversationListSlice.reducer;