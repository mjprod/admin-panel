import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Login, Logout, GetUser } from "../../api/apiCalls";
import { UserResponse } from "../../api/responsePayload/AuthResponse";
import { showConsoleError } from "../../util/ConsoleMessage";

interface AuthErrors {
  data: {
    error: string;
    status: number;
  };
}

interface AuthState {
  isSignedIn: boolean;
  user?: UserResponse;
  authErrors?: AuthErrors;
  loading: boolean;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: undefined,
  authErrors: undefined,
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await Login(username, password);
      if (response) {
        localStorage.setItem("authToken", `Bearer ${response.access}`);
        localStorage.setItem("refreshToken", response.refresh);
        dispatch(getUserInfo());
        return true;
      }
      return rejectWithValue({ error: "Invalid login response", status: 400 });
    } catch (error: any) {
      return rejectWithValue({
        error: error?.message,
        status: error?.status || 500,
      });
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await GetUser();
      return res;
    } catch (e) {
      showConsoleError(e);
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  const token = localStorage.getItem("refreshToken");
  if (!token) return;
  await Logout(token);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthErrors: (state) => {
      state.authErrors = undefined;
    },
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.authErrors = undefined;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.isSignedIn = true;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.authErrors = action.payload;
    });

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isSignedIn = false;
      state.user = undefined;
    });
  },
});

export const { clearAuthErrors, setSignedIn } = authSlice.actions;
export default authSlice.reducer;
