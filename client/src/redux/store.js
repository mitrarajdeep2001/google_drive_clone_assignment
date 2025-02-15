import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import folderReducer from "./slices/folderSlice";


const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
    folder: folderReducer, // Add the folder slice to the store
  },
});

export default store;
