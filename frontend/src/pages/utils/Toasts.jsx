// src/pages/utils/Toasts.jsx
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Directly use position value as string instead of toast.POSITION.TOP_RIGHT
const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide,
};

export const handleSuccess = (message) => {
  toast.success(message, toastOptions);
};

export const handleError = (message) => {
  toast.error(message, toastOptions);
};
