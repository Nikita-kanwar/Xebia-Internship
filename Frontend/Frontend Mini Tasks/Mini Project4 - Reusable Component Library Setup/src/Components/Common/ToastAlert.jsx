import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success') => {
  toast[type](message);
};

const ToastAlert = () => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};

export default ToastAlert;
