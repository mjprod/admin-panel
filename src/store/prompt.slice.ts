import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

interface onPromptState {
  isConfirmationDialog: boolean;
}

const initialState: onPromptState = {
  isConfirmationDialog: false,
};

export const onPromptSlice = createSlice({
  name: "on-Prompt",
  initialState: initialState,
  reducers: {
    setConfirmationDialog(state, action: PayloadAction<boolean>) {
      state.isConfirmationDialog = action.payload;
    },
  },
});

export const updateConfirmationDialog =
  (isSelected: boolean) => (dispatch: AppDispatch) => {
    dispatch(onPromptActions.setConfirmationDialog(isSelected));
  };

export const onPromptActions = onPromptSlice.actions;

export default onPromptSlice.reducer;
