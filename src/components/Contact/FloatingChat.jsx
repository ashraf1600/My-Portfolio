import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiArrowUpRight } from "react-icons/fi";
import profileImg from "../../assets/dp.png";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "👋 Hi there! Need quick info about Ashraf's projects, skills, or research?",
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: userText,
      time: getTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thanks for your message! You can leave your contact info in the Contact section or email Ashraf directly.";
      const lower = userText.toLowerCase();

      if (lower.includes("project") || lower.includes("work")) {
        reply = "Ashraf has built ResQNet, Stacks, ExportMart, and many full-stack & ML apps! Check the Projects section for live demos.";
      } else if (lower.includes("research") || lower.includes("paper")) {
        reply = "Ashraf has peer-reviewed research accepted at IEEE & international conferences covering explainable IoT security, vision transformers, and fraud detection!";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) {
        reply = "You can send a direct email message right here on the site or reach out on LinkedIn!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "assistant",
          text: reply,
          time: getTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 right-24 z-40 font-sans">
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-slate-200 dark:border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/40">
                <img src={profileImg} alt="Ashraful Islam" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  Ashraf's Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h4>
                <p className="text-[11px] text-purple-100 opacity-90">Instant Quick Chat</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Chat Messages Thread */}
          <div ref={chatContainerRef} className="p-4 overflow-y-auto max-h-72 min-h-[220px] space-y-3 text-xs bg-slate-50/50 dark:bg-gray-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-slate-800 dark:text-gray-200 rounded-bl-none border border-slate-200 dark:border-gray-700/60 shadow-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === "user" ? "text-purple-200 text-right" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-none border border-slate-200 dark:border-gray-700/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Jump to Full Form Bar */}
          <div className="px-4 py-2 bg-purple-500/10 border-t border-purple-500/20 flex items-center justify-between text-xs">
            <span className="text-purple-700 dark:text-purple-300 font-medium">Want to send a full email?</span>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-bold"
            >
              <span>Contact Form</span>
              <FiArrowUpRight size={12} />
            </button>
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask a quick question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-50"
            >
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/60 relative group"
        aria-label="Open Floating Message UI"
      >
        {isOpen ? <FiX size={20} /> : <FiMessageSquare size={20} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
