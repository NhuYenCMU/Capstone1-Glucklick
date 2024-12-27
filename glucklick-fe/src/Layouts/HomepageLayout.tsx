// import React from 'react';
// interface HomepageLayoutProps {
//     children: React.ReactNode;
// }

// const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
//     return (
//         <div className="homepage-layout">
//             <main>{children}</main>
//         </div>
//     );
// };

// export default HomepageLayout;
import React, { useEffect } from 'react';

interface HomepageLayoutProps {
    children: React.ReactNode;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
    useEffect(() => {
        // Hàm tải script bên ngoài
        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Không thể tải script ${src}`));
                document.body.appendChild(script);
            });
        };

        // Hàm khởi tạo WebChatClient sau khi script được tải
        const initializeChatClient = () => {
            if ((window as any).CozeWebSDK && (window as any).CozeWebSDK.WebChatClient) {
                new (window as any).CozeWebSDK.WebChatClient({
                    config: {
                        bot_id: '7449993171750731783',
                    },
                    componentProps: {
                        title: 'Coze',
                    },
                });
            } else {
                console.error('CozeWebSDK không khả dụng trên window');
            }
        };

        // Tải script và khởi tạo SDK
        loadScript('https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/oversea/index.js')
            .then(() => {
                initializeChatClient();
            })
            .catch((error) => {
                console.error('Lỗi khi tải script CozeWebSDK:', error);
            });

        // Tùy chọn: Dọn dẹp khi component bị unmount (nếu cần)
        return () => {
            // Nếu SDK cung cấp phương thức để hủy, bạn có thể gọi ở đây
        };
    }, []);

    return (
        <div className="homepage-layout">
            <main>{children}</main>
        </div>
    );
};

export default HomepageLayout;
