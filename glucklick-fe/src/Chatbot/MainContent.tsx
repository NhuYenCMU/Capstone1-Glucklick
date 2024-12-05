import React from "react";
import Section from "./Section";

const MainContent: React.FC = () => {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8">ChatGPT</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Section
          title="Examples"
          icon="fas fa-lightbulb"
          items={[
            "“Explain quantum computing in single terms” →",
            "“Got any creative ideas for a 10 year old’s birthday?” →",
            "“How do I make an HTTP request in Javascript?” →",
          ]}
        />
        <Section
          title="Capabilities"
          icon="fas fa-bolt"
          items={[
            "Remembers what user said earlier in the conversation",
            "Allows user to provide follow-up corrections",
            "Trained to decline inappropriate requests",
          ]}
        />
        <Section
          title="Limitations"
          icon="fas fa-exclamation-triangle"
          items={[
            "May occasionally generate incorrect information",
            "May occasionally produce harmful instructions or biased content",
            "Limited knowledge of world and events after 2021",
          ]}
        />
      </div>
      <div className="mt-8">
        <input
          type="text"
          className="w-full p-4 border rounded shadow"
          placeholder="Send a message..."
        />
      </div>
      <p className="text-gray-500 text-sm mt-4">
        ChatGPT Mar 14 Version. Free Research Preview. Our goal is to make AI
        systems more natural and safe to interact with. Your feedback will help
        us improve.
      </p>
    </div>
  );
};

export default MainContent;
