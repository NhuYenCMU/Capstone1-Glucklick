import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCommentAlt, faTrashAlt, faStar, faMoon, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './css/Chatbot.css';

const ChatbotLayout: React.FC = () => {
    const [inputValue, setInputValue] = useState(""); // State lưu trữ câu hỏi người dùng nhập
    const [messages, setMessages] = useState<{ userMessage: string, botReply: string }[]>([]); // State lưu trữ các cuộc trò chuyện
    const [navItems, setNavItems] = useState<{ userMessage: string }[]>([]); // Lưu trữ danh sách câu hỏi trong phần nav1
    const [isDarkMode, setIsDarkMode] = useState(false); // State để lưu trạng thái dark mode
    const chatHistoryRef = useRef<HTMLDivElement>(null); // Tham chiếu đến div chứa lịch sử chat

    // Hàm xử lý khi nhấn vào mục trong danh sách
    const handleItemClick = (text: string) => {
        setInputValue(text); // Cập nhật giá trị ô nhập liệu khi click vào ví dụ
    };

    // Hàm xử lý khi người dùng gõ vào ô nhập liệu
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Cập nhật giá trị ô nhập liệu khi gõ
    };

    // Hàm gửi câu hỏi và nhận câu trả lời
    const handleSendMessage = () => {
        if (inputValue.trim()) {
            // Thêm câu hỏi của người dùng vào danh sách các cuộc trò chuyện
            setMessages(prevMessages => [
                ...prevMessages,
                { userMessage: inputValue, botReply: "This is a response from ChatGPT." } // Giả lập câu trả lời từ ChatGPT
            ]);

            // Thêm câu hỏi vào phần nav1
            setNavItems(prevNavItems => [
                ...prevNavItems,
                { userMessage: inputValue }
            ]);

            setInputValue(""); // Xóa ô nhập liệu sau khi gửi
        }
    };

    // Hàm xử lý khi nhấn Enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage(); // Gửi tin nhắn khi nhấn Enter
        }
    };

    // Scroll đến tin nhắn cuối cùng mỗi khi có tin nhắn mới
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    // Hàm xử lý khi click vào nút Clear conversations
    const handleClearConversations = () => {
        setMessages([]); // Xóa các tin nhắn nhưng giữ lại navItems
    };

    // Hàm xử lý chuyển đổi chế độ Dark Mode
    const handleToggleDarkMode = () => {
        setIsDarkMode(prevState => !prevState); // Đảo trạng thái dark mode
    };

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}> {/* Thêm class dark-mode nếu ở chế độ tối */}
            {/* Sidebar */}
            <aside className="sidebar">
                <button className="sidebar-button">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span>New chat</span>
                </button>

                <nav className="nav1">
                    <ul>
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                className="nav-item"
                                onClick={() => handleItemClick(item.userMessage)} // Khi click vào câu hỏi người dùng
                            >
                                <FontAwesomeIcon icon={faCommentAlt} className="icon" />
                                <span>{item.userMessage}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer Sidebar */}
                <div className="sidebar-footer">
                    <button className="sidebar-button" onClick={handleClearConversations}>
                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                        <span>Clear conversations</span>
                    </button>
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faStar} className="icon" />
                        <span>Upgrade to Plus</span>
                        <span className="new-badge">NEW</span>
                    </button>
                    <button className="sidebar-button" onClick={handleToggleDarkMode}>
                        <FontAwesomeIcon icon={faMoon} className="icon" />
                        <span>Dark mode</span>
                    </button>
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                        <span>Updates & FAQ</span>
                    </button>
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="title">ChatGPT</h1>

                <div className="grid">
                    {/* Các sections khác vẫn giữ nguyên */}
                </div>

                {/* Hiển thị các cuộc trò chuyện */}
                <div className="chat-history" ref={chatHistoryRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.userMessage ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                <strong>{message.userMessage ? 'User' : 'ChatGPT'}:</strong>
                                <p>{message.userMessage || message.botReply}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="messageBox">
                    <div className="fileUploadWrapper">
                        <label htmlFor="file">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                                <circle strokeWidth={20} stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5" />
                                <path strokeLinecap="round" strokeWidth={25} stroke="#6c6c6c" d="M167.759 79V259" />
                                <path strokeLinecap="round" strokeWidth={25} stroke="#6c6c6c" d="M79 167.138H259" />
                            </svg>
                            <span className="tooltip">Add an image</span>
                        </label>
                        <input type="file" id="file" name="file" />
                    </div>

                    <input
                        required
                        placeholder="Message..."
                        type="text"
                        id="messageInput"
                        value={inputValue} // Gán giá trị ô nhập liệu từ state
                        onChange={handleInputChange} // Cập nhật giá trị khi người dùng gõ
                        onKeyPress={handleKeyPress} // Gửi khi nhấn Enter
                    />
                    <button id="sendButton" onClick={handleSendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                            <path
                                fill="none"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="33.67"
                                stroke="#6c6c6c"
                                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                            ></path>
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ChatbotLayout;
