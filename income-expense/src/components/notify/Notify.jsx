
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function notifySuccess() {
  toast.success('Successfully', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}
export function warning(warn) {
  toast.warn(`Please select ${warn}`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}