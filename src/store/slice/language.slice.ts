import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LanguageCode,
  Language,
} from "../../api/responsePayload/KnowledgeResponse";
import { getUserInfo } from "./auth.slice";

interface LanguageState {
  language: LanguageCode;
}

const initialState: LanguageState = {
  language: Language.MALAYSIAN,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const selectedLanguage = Object.values(Language).find(
        (lang) => lang.id === action.payload?.language_preference
      );
      state.language = selectedLanguage ?? Language.MALAYSIAN;
    });
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
