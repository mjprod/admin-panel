import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

interface onContextState {
  isContextSelected: boolean;
}

const initialState: onContextState = {
  isContextSelected: false,
};

export const onContextSlice = createSlice({
  name: "on-context",
  initialState: initialState,
  reducers: {
    setContextSelected(state, action: PayloadAction<boolean>) {
      state.isContextSelected = action.payload;
    },
  },
});

export const updateContextSelection =
  (isSelected: boolean) => (dispatch: AppDispatch) => {
         dispatch(onContextActions.setContextSelected(isSelected));
  };

export const onContextActions = onContextSlice.actions;

export default onContextSlice.reducer;
