import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from '../services/blogs'

const initialState = null;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action) {
      const user = { ...action.payload };
      state = user;
      console.log("Setting user func: ", state);
      return state;
    },
    removeUser(state, action) {
      state = null;
      return null;
    },
    setUserToken(state, action) {
      const { token } = action.payload;
      state.token = token;
      return null;
    },
  },
});

export const { setUser, removeUser, setUserToken } = loginSlice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    console.log("Reducer side: ", user);
    dispatch(setUser(user));
    window.localStorage.setItem("loggedBloglistappUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser());
    window.localStorage.clear()
  };
};

export default loginSlice.reducer;
