import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategories, getSubCategories, KowledgeSummary } from "../../api/apiCalls";
import { CategoryProps } from "../../pages/newManager/components/sideBar/questionTools/QuestionTools";
import { Category, SubCategory } from "../../util/ExampleData";

interface CategoryState {
    categories: Category[];
    subCategories: SubCategory[];
    selectedCategories: CategoryProps[];
    categoriesFilter: CategoryProps[];
    totalKnowledgeCount: number;
  }
  
  const initialState: CategoryState = {
    categories: [],
    subCategories: [],
    selectedCategories: [],
    categoriesFilter: [],
    totalKnowledgeCount: 0,
  };
  
  export const fetchCategories = createAsyncThunk("category/fetchAll", async () => {
    const [categories, subCategories] = await Promise.all([
      getAllCategories(),
      getSubCategories(),
    ]);
    return { categories, subCategories };
  });
  
  export const fetchKnowledgeSummary = createAsyncThunk(
    "category/fetchSummary",
    async () => {
      const res = await KowledgeSummary();
      return res;
    }
  );
  
  const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
      toggleCategory: (state, action: PayloadAction<CategoryProps>) => {
        const exists = state.selectedCategories.find((c) => c.id === action.payload.id);
        state.selectedCategories = exists
          ? state.selectedCategories.filter((c) => c.id !== action.payload.id)
          : [...state.selectedCategories, action.payload];
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories ?? [];
        state.subCategories = action.payload.subCategories ?? [];
      });
      builder.addCase(fetchKnowledgeSummary.fulfilled, (state, action) => {
        const categories = action.payload?.categories ?? [];
        state.totalKnowledgeCount = categories.reduce(
          (sum, c) => sum + c.knowledge_count,
          0
        );
        state.categoriesFilter = categories.map((cat) => ({
          id: cat.id,
          title: cat.name,
          number: cat.knowledge_count,
          color: state.categories.find((c) => c.id === cat.id)?.colorDetails || {
            borderColor: "#fff",
            lightColor: "#fff",
            darkColor: "#000",
          },
        }));
      });
    },
  });
  
  export const { toggleCategory } = categorySlice.actions;
  export default categorySlice.reducer;