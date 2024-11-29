import React from 'react';
import '../components/common/css/CustomAlert.css';

interface CustomAlertProps {
    message: string;
    color?: 'success' | 'danger' | 'warning' | 'info'; // Các màu alert hỗ trợ
    onClose: () => void; // Hàm xử lý khi đóng alert
}

const CustomAlert_Error: React.FC<CustomAlertProps> = ({ message, color = 'danger', onClose }) => {
    return (
        <div
            className={`alert alert-${color} d-flex align-items-center alert-top-right`}
            role="alert"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi flex-shrink-0 me-2"
                width="24"
                height="24"
                role="img"
                aria-label={`${color} alert`}
                fill="currentColor"
            >
                <path d="M8.982 1.566a1.13 1.13 0 0 1 2.036 0l6.857 11.93c.457.79-.091 1.754-1.018 1.754H3.143c-.927 0-1.475-.965-1.018-1.754L8.982 1.566zM8 11c0 .535.462 1 1.034 1h.932C10.538 12 11 11.535 11 11V7c0-.535-.462-1-1.034-1h-.932C8.462 6 8 6.465 8 7v4zm1.002 2a1.002 1.002 0 1 1-2.003 0 1.002 1.002 0 0 1 2.003 0z" />
            </svg>
            <div>{message}</div>
            <button
                type="button"
                className="btn-close ms-auto"
                aria-label="Close"
                onClick={onClose}
            ></button>
        </div>
    );
};
export default CustomAlert_Error;

