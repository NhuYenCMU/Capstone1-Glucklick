import React from 'react';
import '../components/common/css/CustomAlert.css';

interface CustomAlertProps {
    message: string;
    color?: 'success' | 'danger' | 'warning' | 'info'; // Các màu alert hỗ trợ
    onClose: () => void; // Hàm xử lý khi đóng alert
}
const CustomAlert_Success: React.FC<CustomAlertProps> = ({ message, color = 'success', onClose }) => {
  return (
    <div className="custom-alert alert-success d-flex align-items-center" role="alert">
        <div className="icon-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
            >
                {/* <path d="M15.854 8a7.5 7.5 0 1 1-7.5-7.5 7.5 7.5 0 0 1 7.5 7.5zm-13.5 0a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z" /> */}
                <path d="M10.97 5.97a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 0 1-1.06 1.06L11 7.06 8.03 10.03a.75.75 0 0 1-1.06-1.06l3-3z" />
            </svg>
        </div>
        <div className="message">{message}</div>
        {onClose && (
            <button
                type="button"
                className="btn-close ms-auto"
                aria-label="Close"
                onClick={onClose}
            ></button>
        )}
    </div>
  );
};
export default CustomAlert_Success;