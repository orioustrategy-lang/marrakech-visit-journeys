import { useState } from "react";
import { format } from "date-fns";
import { fr as frLocale } from "date-fns/locale";
import { CalendarIcon, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { formatEuro } from "@/lib/pricing";
import { WHATSAPP_NUMBER, whatsappUrl } from "@/lib/contact";
import { useLanguage } from "@/i18n";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourId: string;
  tourTitle: string;
  people: number;
  pricePerPerson: number;
}

const BookingDialog = ({ open, onOpenChange, tourId, tourTitle, people, pricePerPerson }: BookingDialogProps) => {
  const { t, lang } = useLanguage();
  const locale = lang === "fr" ? frLocale : undefined;
  const [date, setDate] = useState<Date>();
  const [dateOpen, setDateOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", pickup: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [dateError, setDateError] = useState(false);

  const total = pricePerPerson * people;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const summary = () =>
    [
      `Hello, I'd like to book: ${tourTitle}`,
      `Date: ${date ? format(date, "d MMM yyyy") : "-"}`,
      `Travelers: ${people} (${formatEuro(total)} total)`,
      `Name: ${form.name}`,
      form.pickup && `Pickup: ${form.pickup}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setDateError(true);
      return;
    }
    // No backend configured: hand the request over to WhatsApp instead.
    if (!supabase) {
      window.open(whatsappUrl(summary()), "_blank");
      return;
    }
    setStatus("sending");
    const { error } = await supabase.from("bookings").insert({
      tour_id: tourId,
      tour_title: tourTitle,
      customer_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      tour_date: format(date, "yyyy-MM-dd"),
      people,
      pickup_location: form.pickup.trim() || null,
      notes: form.notes.trim() || null,
    });
    if (error) {
      console.error("Booking request failed", error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next && status === "sent") {
      setStatus("idle");
      setDate(undefined);
      setForm({ name: "", email: "", phone: "", pickup: "", notes: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        {status === "sent" ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-14 w-14 text-[#73931e] mx-auto mb-4" />
            <DialogTitle className="text-2xl mb-2">{t("booking.sentTitle")}</DialogTitle>
            <DialogDescription className="text-base">
              {t("booking.sentBody", { email: form.email })}
            </DialogDescription>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline" className="gap-2 rounded-xl">
                <a href={whatsappUrl(summary())} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t("booking.alsoWhatsapp")}
                </a>
              </Button>
              <Button className="rounded-xl" onClick={() => handleOpenChange(false)}>
                {t("common.close")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{t("booking.title")}</DialogTitle>
              <DialogDescription>{tourTitle}</DialogDescription>
            </DialogHeader>

            <div className="flex justify-between items-center rounded-xl bg-muted/50 px-4 py-3 text-sm">
              <span className="text-muted-foreground">
                {t("booking.travelersTotal", { count: people, price: formatEuro(pricePerPerson) })}
              </span>
              <span className="font-bold text-primary text-lg">{formatEuro(total)}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>{t("booking.date")}</Label>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={`w-full justify-start h-11 rounded-xl font-normal hover:bg-muted hover:text-foreground ${!date ? "text-muted-foreground" : ""} ${dateError ? "border-destructive" : ""}`}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "EEEE d MMMM yyyy", { locale }) : t("booking.pickDate")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setDateError(false);
                        setDateOpen(false);
                      }}
                      disabled={{ before: today }}
                      locale={locale}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {dateError && <p className="text-xs text-destructive">{t("booking.dateRequired")}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="bk-name">{t("form.name")}</Label>
                  <Input id="bk-name" required maxLength={120} autoComplete="name" className="h-11 rounded-xl" {...field("name")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-email">{t("form.email")}</Label>
                  <Input id="bk-email" type="email" required maxLength={254} autoComplete="email" className="h-11 rounded-xl" {...field("email")} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="bk-phone">{t("booking.whatsapp")}</Label>
                  <Input
                    id="bk-phone"
                    type="tel"
                    maxLength={40}
                    autoComplete="tel"
                    placeholder="+44 7700 900000"
                    className="h-11 rounded-xl"
                    {...field("phone")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-pickup">{t("booking.pickup")}</Label>
                  <Input id="bk-pickup" maxLength={300} placeholder={t("booking.pickupPlaceholder")} className="h-11 rounded-xl" {...field("pickup")} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-notes">{t("booking.notes")}</Label>
                <Textarea id="bk-notes" rows={3} maxLength={2000} placeholder={t("booking.notesPlaceholder")} className="rounded-xl resize-none" {...field("notes")} />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">
                  {t("booking.error", { phone: `+${WHATSAPP_NUMBER}` })}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full h-12 rounded-xl" disabled={status === "sending"}>
                {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                {supabase ? t("booking.submit") : t("booking.submitWhatsapp")}
              </Button>
              <p className="text-xs text-center text-muted-foreground">{t("booking.noPayment")}</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
