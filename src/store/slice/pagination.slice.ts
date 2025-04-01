import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchConversationsByUrl } from "./conversation.slice";

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
    totalCount: 1,
  };
  
  const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
      setPagination: (
        state,
        action: PayloadAction<Partial<PaginationState>>
      ) => {
        return { ...state, ...action.payload };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchConversationsByUrl.fulfilled, (state, action) => {
        const res = action.payload;
        return {
          ...state,
          currentPage: res?.current_page ?? 1,
          nextPageUrl: res?.next ?? null,
          prevPageUrl: res?.previous ?? null,
          totalPages: res?.total_pages ?? 1,
          totalCount: res?.count ?? 1,
        };
      });
    }
  });
  
  export const { setPagination } = paginationSlice.actions;
  export default paginationSlice.reducer;