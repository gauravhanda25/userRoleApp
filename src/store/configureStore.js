import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import rolesReducer from "./slices/roleSlice";

const rootReducer = combineReducers({
  user: userReducer,
  role: rolesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Export the store
export default store;
