import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllConversation } from "../api/auth";
import { ConversationKnowledge} from "../api/responsePayload/KnowledgeResponse";

interface onConversationState {
  

  conversationList: ConversationKnowledge;
  needApprovalConvList: ConversationKnowledge
  preApprovalConvList: ConversationKnowledge
  rejectedConvList: ConversationKnowledge

}

const initialState: onConversationState = {
  conversationList: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    data: [],
  },

  needApprovalConvList: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    data: [],
  },


  preApprovalConvList: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    data: [],
  },


  rejectedConvList: {
    count: 0,
    total_pages: 0,
    current_page: 0,
    next: null,
    previous: null,
    data: [],
  },
};


export const onConversationListSlice = createSlice({
  name: "on-conversation",
  initialState: initialState,
  reducers: {
    setConversationList: (state, action: PayloadAction<ConversationKnowledge>) => {
      state.conversationList = action.payload;
    },

    setNeedApprovalConvList: (state, action: PayloadAction<ConversationKnowledge>) => {
      state.needApprovalConvList = action.payload;
    },

    setPreApprovalConvList: (state, action: PayloadAction<ConversationKnowledge>) => {
      state.preApprovalConvList = action.payload;
    },

    setRejectedConvList: (state, action: PayloadAction<ConversationKnowledge>) => {
      state.rejectedConvList = action.payload;
    },
  },
});

export const getConversationList = ( pathVariables: Record<string, any> = {},
  queryParams: Record<string, any> = {}) => {
  return async (dispatch: any) => {
    try {
      const res = await AllConversation(pathVariables, queryParams);
      if (res != null) {
        console.log(`----id: ${res.count}`);
        dispatch(onConversationActions.setConversationList(res));
      }
    } catch (error) {
      throw error;
    }
  };
};


export const onConversationActions = onConversationListSlice.actions;

export default onConversationListSlice.reducer;
