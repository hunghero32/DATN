import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slices/userSlice";
import doctorReducer from "../features/slices/doctorSlice";
import scheduleReducer from "../features/slices/scheduleSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    schedules: scheduleReducer,
  },
});

export default store;
