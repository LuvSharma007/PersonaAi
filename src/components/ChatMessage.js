// components/ChatMessage.jsx
import React from "react";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-3 rounded-lg max-w-[75%] text-sm md:text-base whitespace-pre-wrap ${
          isUser ? "bg-red-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {/* Markdown support for code formatting */}
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              return !inline ? (
                <pre className="bg-black text-green-400 p-3 rounded-md overflow-x-auto">
                  <code {...props}>{children}</code>
                </pre>
              ) : (
                <code className="bg-gray-300 px-1 rounded">{children}</code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
