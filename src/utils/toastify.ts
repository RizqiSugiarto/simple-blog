import { toast } from 'react-toastify';

const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info'
) => {
    toast(message, {
        type: type,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export default showToast;
