"use client";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ChatPage() {
  const { mentor } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loader,setLoader] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setLoader(true)
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch(`/api/chat/${mentor}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setLoader(false)
    }finally{
      setLoader(false)
    }

    setInput("");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-700 p-4 font-sans">
      
      {/* Fixed home button in top-left */}
      <Link
        href="/"
        className="absolute top-4 left-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow hover:bg-gray-200"
      >
        Home
      </Link>

      {/* Chat container */}
      <div className="flex flex-col w-full max-w-5xl h-[85vh] bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="flex border-t border-gray-300 p-4 bg-gray-50"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-black text-black rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-red-400"
            placeholder={`Message ${mentor}...`}
          />
          <button
            type="submit"
            className="ml-3 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
