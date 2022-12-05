import { createSlice } from "@reduxjs/toolkit";
const usersAuthSlice = createSlice({
  name: "usersAuth",
  initialState: {
    userId: localStorage.getItem("userId") || null,
    isLoggedIn: localStorage.getItem("userId") ? true : false,
    files : []
  },
  reducers: {

    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      localStorage.clear();
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setLogout, setUserId,setFiles } = usersAuthSlice.actions;
export default usersAuthSlice.reducer;