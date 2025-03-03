import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/slices/userSlice";
import doctorReducer from "../features/slices/doctorSlice";
import guestReducer from "../features/slices/guestSlice";
import serviceReducer from "../features/slices/serviceSlice";
import bookingReducer from "../features/slices/bookingSlice";
import resultReducer from "../features/slices/resultSlice";
import medicalRecordReducer from "../features/slices/medicalRecordSlice";
import scheduleReducer from "../features/slices/scheduleSlice";
import invoiceReducer from "../features/slices/invoiceSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    guest: guestReducer,
    service: serviceReducer,
    booking: bookingReducer,
    result: resultReducer,
    medicalRecord: medicalRecordReducer,
    schedule: scheduleReducer,
    invoice: invoiceReducer,
  },
});

export default store;
