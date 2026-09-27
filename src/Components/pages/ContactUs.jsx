import { useState } from "react";

import emailIcon from "../../assets/email-icon.webp";
import mobileIcon from "../../assets/mobile-icon.png";
import telegramIcon from "../../assets/telegram-icon.png";
import linkedinIcon from "../../assets/linkedin-icons.png";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success'
  const [copiedKey, setCopiedKey] = useState(null);

  const contactMethods = [
    {
      id: "email",
      label: "Email Address",
      value: "sazarafrooz@gmail.com",
      link: "mailto:sazarafrooz@gmail.com",
      icon: emailIcon,
      bgGradient:
        "bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 shadow-rose-900/40",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@SaeedAzarafrooz",
      link: "https://t.me/SaeedAzarafrooz",
      icon: telegramIcon,
      bgGradient:
        "bg-gradient-to-br from-sky-400 to-cyan-500 shadow-sky-900/40",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      value: "Saeed Azarafrooz",
      link: "https://www.linkedin.com/in/saeed-azarafrooz-92a52a268/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BLyAHMv8NSni66VoQjzOA0g%3D%3D",
      icon: linkedinIcon,
      bgGradient:
        "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-blue-950/50",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
    },
    {
      id: "phone",
      label: "Phone / WhatsApp",
      value: "+98 912 848 3270",
      link: "tel:+989128483270",
      icon: mobileIcon,
      bgGradient:
        "bg-gradient-to-br from-emerald-400 via-green-400 to-lime-300 shadow-emerald-500/30",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]",
    },
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16 text-slate-100">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Have a question, feedback on this project, or an opportunity to
          discuss? Feel free to reach out via direct channels or leave a
          message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-slate-200 mb-2">
            Direct Channels
          </h2>

          {contactMethods.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center justify-between pl-6 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-slate-500/80 transition-all duration-300 backdrop-blur-sm group shadow-lg"
            >
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="absolute -left-4 w-16 h-16 flex items-center justify-center pointer-events-none">
                  <div
                    className={`absolute inset-0 rounded-full shadow-md border border-white/10 
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform 
                      group-hover:scale-[1.04] group-hover:shadow-xl group-hover:border-white/25 ${item.bgGradient}`}
                  />
                  <img
                    src={item.icon}
                    alt={item.label}
                    className={`relative z-10 w-9 h-9 object-contain shrink-0 ${item.glow}`}
                  />
                </div>

                <div className="truncate ml-10">
                  <div className="text-xs text-slate-400 font-medium">
                    {item.label}
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors truncate block"
                  >
                    {item.value}
                  </a>
                </div>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={() => handleCopy(item.id, item.value)}
                className="ml-2 px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition shrink-0"
              >
                {copiedKey === item.id ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-700/70 backdrop-blur-md shadow-xl">
          <h2 className="text-xl font-bold text-slate-200 mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Saeed Azarafrooz"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 px-6 rounded-lg font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-[0.99] transition-all disabled:opacity-50 shadow-md shadow-emerald-950/20"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className="p-3 text-sm text-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-fadeIn">
                ✓ Message received successfully! Thank you for reaching out.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
