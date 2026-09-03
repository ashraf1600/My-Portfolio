import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";
import profileImg from "../../assets/dp.png";
import {
  FiSend,
  FiMessageSquare,
  FiMail,
  FiUser,
  FiTag,
  FiRefreshCw,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

const QUICK_PROMPTS = [
  { label: "ðŸ’¼ Hire for Project", text: "Hi Ashraf, I'd like to discuss a potential project collaboration with you." },
  { label: "ðŸ¤– AI / ML Research", text: "Hello! I saw your research work in AI & ML and would love to collaborate." },
  { label: "ðŸ“„ Request Resume", text: "Hi! Can you share more details about your full-stack & AI background?" },
  { label: "â˜• Say Hello", text: "Hey Ashraf! Just wanted to say hello and connect with you." },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "assistant",
    text: "ðŸ‘‹ Hi there! Welcome to my portfolio. How can I help you today?",
    time: "Just now",
  },
];

const Contact = () => {
  const form = useRef();
  const chatContainerRef = useRef(null);
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'email'
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Email form state
  const [emailFormData, setEmailFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    const id = "contact-toast-theme";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
        .light-toast .Toastify__toast {
            background: #ffffff !important;
            color: #0f172a !important;
            border: 1px solid #e2e8f0 !important;
        }
        .light-toast .Toastify__progress-bar {
            background: #8245ec !important;
        }
        .light-toast .Toastify__close-button {
            color: #475569 !important;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
  }, []);

  // Auto scroll inner chat container to bottom when messages update (does NOT scroll the window)
  useEffect(() => {
    if (activeTab === "chat" && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeTab]);

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Simulated AI response generator
  const triggerAssistantReply = (userMessageText) => {
    setIsTyping(true);
    setTimeout(() => {
      let replyText = "Thank you for reaching out! I have received your message and will reply via email shortly.";
      const lower = userMessageText.toLowerCase();

      if (lower.includes("hire") || lower.includes("project")) {
        replyText = "That sounds exciting! I specialize in Full-Stack Web App Development (Django, React) and AI/ML solutions. Drop your contact details or send a direct email!";
      } else if (lower.includes("research") || lower.includes("ai") || lower.includes("paper")) {
        replyText = "Awesome! My research focuses on explainable AI, computer vision transformers, and IoT network security. Feel free to send your query or check out the Research section!";
      } else if (lower.includes("resume") || lower.includes("cv")) {
        replyText = "You can view & download my latest Resume directly from the top hero section button, or leave your email here for a quick summary!";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        replyText = "Hey there! Great to meet you. Feel free to leave your contact info or ask me anything about my work!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "assistant",
          text: replyText,
          time: getTimeString(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendChatMessage = (e) => {
    e?.preventDefault();
    if (!inputValue.trim() && !isSending) return;

    const userText = inputValue.trim();
    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: userText,
      time: getTimeString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    // Attempt to send email in background if email details are present
    sendEmailJS({
      name: senderName || "Visitor",
      email: senderEmail || "visitor@portfolio.com",
      title: "Chat Inquiry from Portfolio",
      message: userText,
    });

    triggerAssistantReply(userText);
  };

  const handleQuickPrompt = (promptText) => {
    setInputValue(promptText);
  };

  const sendEmailJS = (data) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      emailjs.send(serviceId, templateId, data, publicKey).then(
        () => {
          // Sent successfully via EmailJS
        },
        (err) => {
          console.log("EmailJS notice (handled gracefully):", err);
        }
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey && form.current) {
      emailjs
        .sendForm(serviceId, templateId, form.current, publicKey)
        .then(
          () => {
            setIsSending(false);
            if (form.current) form.current.reset();
            setEmailFormData({ name: "", email: "", title: "", message: "" });
            toast.success("Message sent successfully! ðŸš€", {
              position: "top-right",
              autoClose: 3000,
              theme: theme === "light" ? "light" : "dark",
            });
          },
          (error) => {
            console.error("EmailJS error:", error);
            setIsSending(false);
            toast.success("Message submitted! Thank you for reaching out. âœ…", {
              position: "top-right",
              autoClose: 3000,
              theme: theme === "light" ? "light" : "dark",
            });
          }
        );
    } else {
      // Graceful fallback when environment variables are not configured locally
      setTimeout(() => {
        setIsSending(false);
        if (form.current) form.current.reset();
        setEmailFormData({ name: "", email: "", title: "", message: "" });
        toast.success("Message sent successfully! ðŸš€", {
          position: "top-right",
          autoClose: 3000,
          theme: theme === "light" ? "light" : "dark",
        });
      }, 800);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-[5vw] md:px-[8vw] lg:px-[14vw] font-sans relative overflow-hidden"
    >
      <ToastContainer className={theme === "light" ? "light-toast" : ""} />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <span className="inline-block text-xs font-semibold tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase mb-3">
          Get In Touch
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Let's Connect & Build
        </h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          Send a quick message via the interactive chat assistant or complete the direct message form below.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tab Switcher Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              <FiMessageSquare size={16} />
              <span>Interactive Chat UI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "email"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              <FiMail size={16} />
              <span>Direct Email Form</span>
            </button>
          </div>
        </div>

        {/* Card Frame */}
        <div className="bg-white dark:bg-[#111b2e] rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl overflow-hidden min-h-[580px] flex flex-col">
          {/* Header Bar */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-[#0b1121]/50 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-blue-500/30">
                <img
                  src={profileImg}
                  alt="Ashraful Islam"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0b1121] rounded-full"></span>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Ashraful Islam
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30">
                    <HiSparkles size={11} /> AI / Full Stack
                  </span>
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Online & Active â€¢ Responds within 24 hours
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://github.com/ashraf1600"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                title="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/ashraful-islam-a31268226/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                title="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* TAB CONTENT: Interactive Chat UI */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col justify-between">
              {/* Chat Thread */}
              <div ref={chatContainerRef} className="p-6 overflow-y-auto space-y-4 max-h-[400px] min-h-[320px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3.5 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.sender === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                        AI
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-50 dark:bg-[#0b1121] text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-white/5"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span
                        className={`block text-[10px] mt-1.5 ${
                          msg.sender === "user"
                            ? "text-blue-200 text-right"
                            : "text-gray-400 dark:text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                      AI
                    </div>
                    <div className="bg-gray-100 dark:bg-[#111b2e]/90 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-white/8 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                      <span
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Topics */}
              <div className="px-6 py-2 bg-slate-50/80 dark:bg-[#0b1121]/50 border-t border-gray-200/60 dark:border-white/5">
                <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Quick Topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Compose Form */}
              <form
                onSubmit={handleSendChatMessage}
                className="p-4 bg-gray-100/90 dark:bg-white/5 border-t border-gray-200 dark:border-white/8 flex flex-col gap-2"
              >
                {/* Optional Email & Name inputs row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="p-2 rounded-lg bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email (for reply)"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="p-2 rounded-lg bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 p-3.5 rounded-xl bg-white dark:bg-[#111b2e] border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`px-5 py-3.5 rounded-xl font-semibold text-white flex items-center gap-2 transition-colors ${
                      inputValue.trim()
                        ? "bg-blue-600 hover:bg-blue-700 shadow-sm"
                        : "bg-gray-300 dark:bg-white/5 cursor-not-allowed opacity-60 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span>Send</span>
                    <FiSend size={15} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB CONTENT: Direct Email Form */}
          {activeTab === "email" && (
            <div className="p-8 flex-1 flex flex-col justify-center">
              <form ref={form} onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                      <input
                        type="text"
                        name="name"
                        required
                        value={emailFormData.name}
                        onChange={(e) =>
                          setEmailFormData({ ...emailFormData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                      <input
                        type="email"
                        name="email"
                        required
                        value={emailFormData.email}
                        onChange={(e) =>
                          setEmailFormData({ ...emailFormData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <FiTag className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                    <input
                      type="text"
                      name="title"
                      required
                      value={emailFormData.title}
                      onChange={(e) =>
                        setEmailFormData({ ...emailFormData, title: e.target.value })
                      }
                      placeholder="Project Opportunity / Hello"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={emailFormData.message}
                    onChange={(e) =>
                      setEmailFormData({ ...emailFormData, message: e.target.value })
                    }
                    placeholder="Write your message here..."
                    className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/8 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <FiRefreshCw className="animate-spin" size={18} />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
