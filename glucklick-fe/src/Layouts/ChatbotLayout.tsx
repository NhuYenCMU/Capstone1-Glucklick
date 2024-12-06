import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCommentAlt, faTrashAlt, faStar, faMoon, faInfoCircle, faSignOutAlt, faLightbulb, faBolt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './css/Chatbot.css'; // Import file CSS của bạn

const ChatbotLayout: React.FC = () => {
    const [inputValue, setInputValue] = useState(""); // State để lưu giá trị của ô nhập liệu

    // Hàm xử lý khi nhấn vào mục trong danh sách
    const handleItemClick = (text: string) => {
        setInputValue(text); // Cập nhật giá trị ô nhập liệu
    };

    // Hàm xử lý khi người dùng gõ vào ô nhập liệu
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Cập nhật giá trị ô nhập liệu khi gõ
    };

    return (
        <div className="app">
            <aside className="sidebar">
                <button className="sidebar-button">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span>New chat</span>
                </button>
                <nav className="nav1">
                    <ul>
                        {[
                            'What is ChatGPT',
                            'What is ChatGPT-4',
                            'What is OpenAI',
                            'What is StableDiffusion',
                            'How to access Bing AI',
                            'Can I use Notion AI',
                            'ChatGPT for Google',
                            'What is TikTok AI voice',
                            'What is AI'
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="nav-item"
                                onClick={() => handleItemClick(item)} // Thêm sự kiện onClick
                            >
                                <FontAwesomeIcon icon={faCommentAlt} className="icon" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                        <span>Clear conversations</span>
                    </button>
                    <button className="sidebar-button">
                        <FontAwesomeIcon icon={faStar} className="icon" />
                        <span>Upgrade to Plus</span>
                        <span className="new-badge">NEW</span>
                    </button>
                    <button className="sidebar-button">
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
            <main className="main-content">
                <h1 className="title">ChatGPT</h1>
                <div className="grid">
                    <div className="grid-item">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faLightbulb} className="icon" />
                            Examples
                        </h2>
                        <ul>
                            {[
                                '“Explain quantum computing in simple terms” →',
                                '“Got any creative ideas for a 10-year-old’s birthday?” →',
                                '“How do I make an HTTP request in Javascript?” →'
                            ].map((example, index) => (
                                <li
                                    key={index}
                                    className="example-item"
                                    onClick={() => handleItemClick(example)} // Mỗi example click sẽ đưa vào input
                                >
                                    {example}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid-item">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faBolt} className="icon" />
                            Capabilities
                        </h2>
                        <ul>
                            {[
                                'Remembers what user said earlier in the conversation',
                                'Allows user to provide follow-up corrections',
                                'Trained to decline inappropriate requests'
                            ].map((capability, index) => (
                                <li
                                    key={index}
                                    className="capability-item"
                                    onClick={() => handleItemClick(capability)} // Mỗi capability click sẽ đưa vào input
                                >
                                    {capability}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid-item">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
                            Limitations
                        </h2>
                        <ul>
                            {[
                                'May occasionally generate incorrect information',
                                'May occasionally produce harmful instructions or biased content',
                                'Limited knowledge of world and events after 2021'
                            ].map((limitation, index) => (
                                <li
                                    key={index}
                                    className="limitation-item"
                                    onClick={() => handleItemClick(limitation)} // Mỗi limitation click sẽ đưa vào input
                                >
                                    {limitation}
                                </li>
                            ))}
                        </ul>
                    </div>
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
                    />
                    <button id="sendButton">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                            <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
                            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888" />
                        </svg>
                    </button>
                </div>

                <p className="footer-text">
                    ChatGPT Mar 14 Version. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.
                </p>
            </main>
        </div>
    );
};

export default ChatbotLayout;
