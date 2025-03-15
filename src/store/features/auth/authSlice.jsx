import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase";
//  checking data the in localStorage
const laodUserFromStorage = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, thunkAPI) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        username,
        email,
        password
      );
      return userData.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// google sign in
export const signWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        email: user.email,
        displayName: user.displayName,
        photo: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredentials.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const useAuth = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user)); // user  is  loged in
    } else {
      dispatch(setUser(null));
    }
  });
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: laodUserFromStorage(),
    loading: false,
    error: null,
  },
  // add reducer
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
