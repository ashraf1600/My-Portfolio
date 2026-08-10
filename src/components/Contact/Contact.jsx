import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../context/ThemeContext";

const Contact = () => {
  const form = useRef();
  const { theme } = useTheme();

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
            background: #a855f7 !important;
        }
        .light-toast .Toastify__close-button {
            color: #475569 !important;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: theme === "light" ? "light" : "dark",
          });
        },
        (error) => {
          console.error("EmailJS error:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: theme === "light" ? "light" : "dark",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
    >
      <ToastContainer className={theme === "light" ? "light-toast" : ""} />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">CONTACT</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-slate-600 dark:text-gray-400 mt-4 text-lg font-semibold">
          I’d love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-purple-500/20 border border-slate-200 dark:border-gray-700/50">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-1">
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form ref={form} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3.5 rounded-lg bg-slate-100 dark:bg-gray-800/60 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 border border-slate-200 dark:border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3.5 rounded-lg bg-slate-100 dark:bg-gray-800/60 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 border border-slate-200 dark:border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
          />
          <input
            type="text"
            name="title"
            placeholder="Subject"
            required
            className="w-full p-3.5 rounded-lg bg-slate-100 dark:bg-gray-800/60 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 border border-slate-200 dark:border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3.5 rounded-lg bg-slate-100 dark:bg-gray-800/60 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 border border-slate-200 dark:border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3.5 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
