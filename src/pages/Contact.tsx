import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Instagram, Star, CheckCircle2, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";
import { CONTACT_EMAIL, PHONE_NUMBERS, SITE_URL, SOCIAL, openWhatsApp } from "@/lib/contact";
import { useT } from "@/i18n";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

const TikTokIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Contact = () => {
  const t = useT();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Without a backend, hand the message to the visitor's email app.
    if (!supabase) {
      const body = `${form.message}\n\n${form.name}${form.phone ? `\n${form.phone}` : ""}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    if (error) {
      console.error("Contact message failed", error);
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm(emptyForm);
  };

  const contactInfo = [
    { icon: Phone, title: t("contact.phone"), details: PHONE_NUMBERS.map((p) => ({ text: p, href: `tel:${p.replace(/\s/g, "")}` })) },
    { icon: Mail, title: t("contact.email"), details: [{ text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }] },
    { icon: MapPin, title: t("contact.location"), details: [{ text: "Marrakech, Morocco" }] },
    { icon: Clock, title: t("contact.hours"), details: [{ text: t("contact.hoursValue") }] },
  ];

  const socials = [
    { href: SOCIAL.instagram, label: "Instagram", icon: <Instagram className="h-5 w-5" /> },
    { href: SOCIAL.tiktok, label: "TikTok", icon: <TikTokIcon /> },
    { href: SOCIAL.tripadvisor, label: "TripAdvisor", icon: <Star className="h-5 w-5" /> },
  ];

  const inputClass = "h-12 rounded-xl border-border/50 focus:border-primary";

  return (
    <div className="min-h-screen pt-20">
      <SEO title={t("contact.seoTitle")} description={t("contact.seoDescription")} url={`${SITE_URL}/contact`} />

      <section className="relative py-16 md:py-20 bg-[#f1742a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("contact.title")}</h1>
            <p className="text-lg text-white/85">{t("contact.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#5f7a18] rounded-2xl p-8 text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t("contact.quickTitle")}</h2>
                <p className="text-white/85 mb-6">{t("contact.quickBody")}</p>
                <Button
                  onClick={() => openWhatsApp(t("contact.whatsappGreeting"))}
                  className="w-full bg-white text-[#5f7a18] hover:bg-white/90 rounded-xl h-12 font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t("contact.chatWhatsapp")}
                </Button>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-8">
                <h2 className="text-xl font-bold mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("contact.infoTitle")}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium mb-1">{item.title}</p>
                        {item.details.map((d) =>
                          d.href ? (
                            <a key={d.text} href={d.href} className="block text-muted-foreground text-sm hover:text-primary break-all">
                              {d.text}
                            </a>
                          ) : (
                            <p key={d.text} className="text-muted-foreground text-sm">
                              {d.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">{t("contact.follow")}</p>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 md:p-10">
                {status === "sent" ? (
                  <div className="text-center py-12" role="status">
                    <CheckCircle2 className="h-14 w-14 text-[#73931e] mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{t("contact.sentTitle")}</h2>
                    <p className="text-muted-foreground mb-8">{t("contact.sentBody")}</p>
                    <Button variant="outline" className="rounded-xl" onClick={() => setStatus("idle")}>
                      {t("contact.sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2">{t("contact.formTitle")}</h2>
                    <p className="text-muted-foreground mb-8">{t("contact.formSubtitle")}</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            {t("form.name")}
                          </label>
                          <Input id="name" autoComplete="name" required maxLength={120} className={inputClass} {...field("name")} />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            {t("form.email")}
                          </label>
                          <Input id="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} {...field("email")} />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            {t("form.phoneOptional")}
                          </label>
                          <Input id="phone" type="tel" autoComplete="tel" maxLength={40} className={inputClass} {...field("phone")} />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            {t("form.subject")}
                          </label>
                          <Input
                            id="subject"
                            placeholder={t("form.subjectPlaceholder")}
                            required
                            maxLength={200}
                            className={inputClass}
                            {...field("subject")}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          {t("form.message")}
                        </label>
                        <Textarea
                          id="message"
                          placeholder={t("form.messagePlaceholder")}
                          rows={6}
                          required
                          maxLength={5000}
                          className="rounded-xl border-border/50 focus:border-primary resize-none"
                          {...field("message")}
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-destructive" role="alert">
                          {t("contact.error", { email: CONTACT_EMAIL })}
                        </p>
                      )}

                      <Button type="submit" size="lg" className="w-full rounded-xl h-12 gap-2" disabled={status === "sending"}>
                        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {t("contact.send")}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <div className="h-[320px] md:h-[400px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429134.39854906546!2d-8.160650939804688!3d31.634573226960174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1638888888888!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={t("contact.mapTitle")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
