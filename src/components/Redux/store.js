import { configureStore } from "@reduxjs/toolkit";
import usersAuth from "./reducers/usersAuth";
  

export default configureStore({
  reducer: {
    usersAuth: usersAuth,

  },
});
