
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
        <ReactMarkdown
          components={{
            pre({ children }) {
              // render pre safely without being wrapped in <p>
              return (
                <pre className="bg-black text-green-400 p-3 rounded-md overflow-x-auto">
                  {children}
                </pre>
              );
            },
            code({ inline, className, children, ...props }) {
              if (inline) {
                return (
                  <code
                    className="bg-gray-300 px-1 rounded"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return <code {...props}>{children}</code>;
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
