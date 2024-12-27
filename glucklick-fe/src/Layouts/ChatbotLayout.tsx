import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCommentAlt, faMoon } from '@fortawesome/free-solid-svg-icons';
import './css/Chatbot.css';

const ChatbotLayout: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ userMessage: string; botReply: string }[]>([]);
    const [navItems, setNavItems] = useState<string[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const chatHistoryRef = useRef<HTMLDivElement>(null);

    // Tự động cuộn xuống dưới khi thêm tin nhắn
    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    const generateChatbotResponse = useCallback((userMessage: string): string => {
        return `This is a simulated response for: "${userMessage}"`;
    }, []);

    const handleSendMessage = useCallback(() => {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const chatbotResponse = generateChatbotResponse(trimmedInput);

        setMessages((prevMessages) => [
            ...prevMessages,
            { userMessage: trimmedInput, botReply: chatbotResponse },
        ]);
        setNavItems((prevNavItems) => [...prevNavItems, trimmedInput]);
        setInputValue('');
    }, [inputValue, generateChatbotResponse]);

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        },
        [handleSendMessage]
    );

    const handleNewChatClick = useCallback(() => {
        setMessages([]);
        setNavItems([]);
    }, []);

    const handleToggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => !prev);
    }, []);

    return (
        <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
            <aside className="sidebar">
                <button className="sidebar-button" onClick={handleNewChatClick}>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    <span>New chat</span>
                </button>

                <nav className="nav1">
                    <ul>
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                className="nav-item"
                                onClick={() => setInputValue(item)}
                            >
                                <FontAwesomeIcon icon={faCommentAlt} className="icon" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-button" onClick={handleToggleDarkMode}>
                        <FontAwesomeIcon icon={faMoon} className="icon" />
                        <span>Dark mode</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <h1 className="title"> <img src="/Glücklich__1_-removebg-preview.png" alt="" /></h1>
                <zapier-interfaces-chatbot-embed
                    is-popup="false"
                    chatbot-id="cm4w5p3iz0042x3v9qpr2j3x3"
                    height="650px"
                    width="900px"
                ></zapier-interfaces-chatbot-embed>
            </main>
        </div>
    );
};

export default ChatbotLayout;