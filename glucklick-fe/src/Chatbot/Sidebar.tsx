import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-64 p-4 flex flex-col">
      <button className="bg-gray-800 text-white py-2 px-4 rounded mb-4 flex items-center">
        <i className="fas fa-plus mr-2"></i> New chat
      </button>
      <ul className="flex-1 overflow-y-auto">
        {[
          "What is ChatGPT",
          "What is ChatGPT-4",
          "What is OpenAI",
          "What is StableDiffusion",
          "How to access Bing AI",
          "Can I use Notion AI",
          "ChatGPT for Google",
          "What is TikTok AI voice",
          "What is AI",
        ].map((item, index) => (
          <li className="mb-2 flex items-center" key={index}>
            <i className="fas fa-comment-alt mr-2"></i> {item}
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-700 pt-4">
        <button className="flex items-center text-gray-400 mb-2">
          <i className="fas fa-trash-alt mr-2"></i> Clear conversations
        </button>
        <button className="flex items-center text-gray-400 mb-2">
          <i className="fas fa-star mr-2"></i> Upgrade to Plus{" "}
          <span className="bg-yellow-500 text-black text-xs ml-2 px-1 rounded">NEW</span>
        </button>
        <button className="flex items-center text-gray-400 mb-2">
          <i className="fas fa-moon mr-2"></i> Dark mode
        </button>
        <button className="flex items-center text-gray-400 mb-2">
          <i className="fas fa-info-circle mr-2"></i> Updates & FAQ
        </button>
        <button className="flex items-center text-gray-400">
          <i className="fas fa-sign-out-alt mr-2"></i> Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
