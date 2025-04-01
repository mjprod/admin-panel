import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SideCardType } from "../../util/QuestionStatus";

interface StatusState {
    statusClicked: SideCardType;
  }
  
  const initialState: StatusState = {
    statusClicked: SideCardType.NeedApproval,
  };
  
  const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
      setStatusClicked: (state, action: PayloadAction<SideCardType>) => {
        state.statusClicked = action.payload;
      },
    },
  });
  
  export const { setStatusClicked } = statusSlice.actions;
  export default statusSlice.reducer;