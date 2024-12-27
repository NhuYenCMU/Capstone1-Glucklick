import React, { useState } from 'react';
import axios from 'axios';
import './mcq.css'
const UploadFile: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    // Hàm xử lý thay đổi file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Hàm xử lý upload file lên server
    const handleUpload = async () => {
        if (!file) {
            setMessage('Vui lòng chọn file để tải lên.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            setMessage('');

            // Gửi file lên server qua API
            const response = await axios.post('https://your-server.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Kiểm tra phản hồi từ server
            if (response.status === 200) {
                setMessage('Tải lên thành công!');
            } else {
                setMessage('Đã xảy ra lỗi trong quá trình tải lên.');
            }
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Đã xảy ra lỗi trong quá trình tải lên.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-file-container">
            <h1>Tải lên file PDF hoặc DOCX</h1>

            {/* Form chọn file */}
            <input
                type="file"
                accept=".pdf, .docx"
                onChange={handleFileChange}
            />

            {/* Nút upload */}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Đang tải lên...' : 'Tải lên'}
            </button>

            {/* Thông báo */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadFile;
