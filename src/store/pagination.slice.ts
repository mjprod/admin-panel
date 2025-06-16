// store/slices/paginationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalPages: number;
  totalCount: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  nextPageUrl: null,
  prevPageUrl: null,
  totalPages: 1,
  totalCount: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<Partial<PaginationState>>) {
      return { ...state, ...action.payload };
    },
    resetPagination() {
      return initialState;
    },
  },
});

export const { setPagination, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;