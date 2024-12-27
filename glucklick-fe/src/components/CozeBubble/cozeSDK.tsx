import React, { useEffect } from 'react';

// Declare the CozeWebSDK property on the window object
declare global {
    interface Window {
        CozeWebSDK: any;
    }
}

const CozeChatBubble: React.FC = () => {
    useEffect(() => {
        // Thêm script Coze SDK vào DOM
        const script = document.createElement('script');
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/oversea/index.js';
        script.async = true;
        script.onload = () => {
            // Khởi tạo Coze Web SDK khi script đã tải xong
            if (window.CozeWebSDK) {
                new window.CozeWebSDK.WebChatClient({
                    config: {
                        bot_id: '7449993171750731783', // Thay bằng bot_id của bạn
                    },
                    componentProps: {
                        title: 'Coze Chatbot', // Tùy chỉnh tiêu đề bong bóng chat
                    },
                });
            }
        };
        document.body.appendChild(script);

        // Cleanup script khi component bị unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // Thành phần này không cần render gì
};

export default CozeChatBubble;