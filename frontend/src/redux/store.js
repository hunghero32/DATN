import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slices/userSlice";
import doctorReducer from "../features/slices/doctorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
  },
});

export default store;
