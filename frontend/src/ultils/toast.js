import toast from "react-hot-toast";

export const ToastSucess = (notify) => {
  toast.success(notify, {
    duration: 5000,
  });
};

export const ToastError = (notify) => {
  toast.error(notify, {
    duration: 5000, 
  });
};