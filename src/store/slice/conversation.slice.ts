import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { KnowledgeCard } from "../../api/responsePayload/KnowledgeResponse";
import { RootState } from "../store";
import { AllConversation } from "../../api/apiCalls";
import { getQuestionStatusFromSideCardType } from "../../util/QuestionStatus";

interface ConversationState {
  conversations: KnowledgeCard[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "conversation/fetch",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { selectedCategories } = state.category;
    const language = state.language.language;

    const categoryIds = selectedCategories.map((c) => c.id).join(",");
    const status = state.status.statusClicked;
    const currentStatus = getQuestionStatusFromSideCardType(status);
    const params: Record<string, any> = {
      ...(currentStatus !== null && { status: currentStatus }),
      ...(categoryIds.length > 0 && { category: categoryIds }),
      language: language.id,
    };

    const res = await AllConversation(language.code, undefined, {}, params);
    return res;
  }
);

export const fetchConversationsByUrl = createAsyncThunk(
  "conversation/fetchByUrl",
  async (url: string, { getState }) => {
    const state = getState() as RootState;
    const language = state.language.language;
    const res = await AllConversation(language.code, url, {}, {});
    return res;
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload?.data ?? [];
    });
    builder.addCase(fetchConversationsByUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload?.data ?? [];
    }
    );
  },
});

export default conversationSlice.reducer;