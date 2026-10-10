import { useState } from "react";
import {
  Container,
  Card,
  FormGrid,
  FormField,
  FormInput,
  Button,
  Icon,
} from "../ui";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [copiedKey, setCopiedKey] = useState(null);

  const contactMethods = [
    {
      id: "email",
      label: "Email Address",
      value: "sazarafrooz@gmail.com",
      link: "mailto:sazarafrooz@gmail.com",
      iconName: "mail",
      bgGradient:
        "bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 shadow-rose-900/40",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@SaeedAzarafrooz",
      link: "https://t.me/SaeedAzarafrooz",
      iconName: "telegram",
      bgGradient:
        "bg-gradient-to-br from-sky-400 to-cyan-500 shadow-sky-900/40",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      value: "Saeed Azarafrooz",
      link: "https://www.linkedin.com/in/saeed-azarafrooz",
      iconName: "linkedin",
      bgGradient:
        "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-blue-950/50",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
    },
    {
      id: "phone",
      label: "Phone / WhatsApp",
      value: "+98 912 848 3270",
      link: "tel:+989128483270",
      iconName: "mobile",
      bgGradient:
        "bg-gradient-to-br from-emerald-400 via-green-400 to-lime-300 shadow-emerald-500/30",
      glow: "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
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
    <Container className="max-w-6xl py-10 md:py-16 text-foreground transition-colors duration-200">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Have a question, feedback on this project, or an opportunity to
          discuss? Feel free to reach out via direct channels or leave a
          message.
        </p>
      </div>

      {/* 50/50 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Direct Channels inside a matching Card */}
        <Card
          padding="lg"
          className="backdrop-blur-md shadow-xl flex flex-col justify-between overflow-visible"
        >
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Direct Channels
            </h2>

            <div className="space-y-5">
              {contactMethods.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center justify-between pl-9 pr-3.5 py-3 rounded-xl border border-border/80 bg-background/40 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center shrink-0">
                    <div
                      className={`absolute inset-0 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-md ${item.bgGradient}`}
                    />
                    <Icon
                      name={item.iconName}
                      className={`relative z-10 w-10 h-10 text-black ${item.glow}`}
                    />
                  </div>

                  <div className="truncate min-w-0 pr-2 pl-8">
                    <div className="text-xs text-muted-foreground font-medium">
                      {item.label}
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  </div>

                  {/* Copy button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(item.id, item.value)}
                    className="h-7 px-2.5 text-xs shrink-0 cursor-pointer"
                  >
                    {copiedKey === item.id ? "Copied!" : "Copy"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Column: Interactive Form */}
        <Card
          padding="lg"
          className="backdrop-blur-md shadow-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormGrid columns={1}>
                <FormInput
                  id="name"
                  name="name"
                  label="YOUR NAME"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Saeed Azarafrooz"
                />

                <FormInput
                  id="email"
                  name="email"
                  label="YOUR EMAIL"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

                <FormField label="MESSAGE" id="message">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="flex w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,box-shadow,opacity] duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none caret-foreground selection:bg-primary/30 selection:text-foreground"
                  />
                </FormField>
              </FormGrid>

              <Button
                type="submit"
                disabled={status === "sending"}
                isLoading={status === "sending"}
                className="w-full py-3 h-auto font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 active:scale-[0.99] transition-all disabled:opacity-50 shadow-md shadow-emerald-950/20 cursor-pointer border-0 mt-2"
              >
                Send Message
              </Button>

              {status === "success" && (
                <div className="p-3 text-sm text-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  ✓ Message received successfully! Thank you for reaching out.
                </div>
              )}
            </form>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default ContactUs;
