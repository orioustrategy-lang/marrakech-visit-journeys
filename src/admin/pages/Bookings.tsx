import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, Phone, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatEuro } from "@/lib/pricing";
import { useBookings, useDeleteBooking, useUpdateBooking, type Booking, type BookingStatus } from "../api";
import { BOOKING_STATUSES, EmptyState, ErrorState, PageHeader, StatusBadge, formatDate, whatsappLink } from "../components";

type View = "upcoming" | "all" | BookingStatus;

const todayIso = () => new Date().toISOString().slice(0, 10);

const BookingDetail = ({ booking, onClose }: { booking: Booking; onClose: () => void }) => {
  const update = useUpdateBooking();
  const remove = useDeleteBooking();
  const [notes, setNotes] = useState(booking.admin_notes ?? "");

  useEffect(() => setNotes(booking.admin_notes ?? ""), [booking.id, booking.admin_notes]);

  const setStatus = (status: BookingStatus) =>
    update.mutate(
      { id: booking.id, status },
      { onSuccess: () => toast.success(`Marked as ${status}`), onError: (e) => toast.error(e.message) }
    );

  const greeting = `Hello ${booking.customer_name.split(" ")[0]}, thank you for your booking request for "${booking.tour_title}" on ${formatDate(booking.tour_date)} for ${booking.people} ${booking.people === 1 ? "person" : "people"}.`;

  const rows: [string, React.ReactNode][] = [
    ["Tour", booking.tour_title],
    ["Date", formatDate(booking.tour_date)],
    ["Travelers", booking.people],
    ["Price", booking.total_price != null ? `${formatEuro(Number(booking.total_price))} (${formatEuro(Number(booking.price_per_person))} / person)` : "—"],
    ["Pickup", booking.pickup_location || "—"],
    ["Email", booking.email],
    ["Phone", booking.phone || "—"],
    ["Requested", formatDate(booking.created_at, true)],
  ];

  return (
    <>
      <SheetHeader className="text-left">
        <SheetTitle>{booking.customer_name}</SheetTitle>
        <SheetDescription>
          <StatusBadge status={booking.status} />
        </SheetDescription>
      </SheetHeader>

      <dl className="mt-6 grid grid-cols-[96px_1fr] gap-y-2.5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="break-words">{v}</dd>
          </div>
        ))}
      </dl>

      {booking.notes && (
        <div className="mt-5">
          <p className="text-sm text-muted-foreground mb-1">Customer notes</p>
          <p className="text-sm whitespace-pre-wrap rounded-lg bg-muted/60 p-3">{booking.notes}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {booking.phone && (
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1ebe5a] text-white">
            <a href={whatsappLink(booking.phone, greeting)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        )}
        <Button asChild size="sm" variant="outline">
          <a href={`mailto:${booking.email}?subject=${encodeURIComponent(`Your booking: ${booking.tour_title}`)}&body=${encodeURIComponent(greeting)}`}>
            <Mail className="h-4 w-4" />
            Email
          </a>
        </Button>
        {booking.phone && (
          <Button asChild size="sm" variant="outline">
            <a href={`tel:${booking.phone}`}>
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <Label>Status</Label>
        <div className="grid grid-cols-2 gap-2">
          {BOOKING_STATUSES.map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant={booking.status === s ? "default" : "outline"}
              className="capitalize"
              disabled={update.isPending}
              onClick={() => setStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="admin-notes">Internal notes</Label>
        <Textarea id="admin-notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Driver, deposit, special requests…" />
        <Button
          size="sm"
          variant="outline"
          disabled={notes === (booking.admin_notes ?? "") || update.isPending}
          onClick={() =>
            update.mutate(
              { id: booking.id, admin_notes: notes || null },
              { onSuccess: () => toast.success("Notes saved"), onError: (e) => toast.error(e.message) }
            )
          }
        >
          Save notes
        </Button>
      </div>

      <div className="mt-10 pt-4 border-t border-border/60">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete booking
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes {booking.customer_name}'s request. To keep a record, mark it as cancelled instead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() =>
                  remove.mutate(booking.id, {
                    onSuccess: () => {
                      toast.success("Booking deleted");
                      onClose();
                    },
                    onError: (e) => toast.error(e.message),
                  })
                }
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

const Bookings = () => {
  const { data: bookings, isLoading, error } = useBookings();
  const [view, setView] = useState<View>("upcoming");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!bookings) return [];
    const q = query.toLowerCase();
    const today = todayIso();
    const list = bookings.filter((b) => {
      if (view === "upcoming" && (b.tour_date < today || b.status === "cancelled" || b.status === "completed")) return false;
      if (view !== "upcoming" && view !== "all" && b.status !== view) return false;
      return `${b.customer_name} ${b.email} ${b.phone ?? ""} ${b.tour_title}`.toLowerCase().includes(q);
    });
    // Upcoming reads best soonest-first; other views newest request first.
    return view === "upcoming" ? [...list].sort((a, b) => a.tour_date.localeCompare(b.tour_date)) : list;
  }, [bookings, view, query]);

  if (error) return <ErrorState error={error} />;

  const selected = bookings?.find((b) => b.id === selectedId) ?? null;
  const counts = (s: BookingStatus) => bookings?.filter((b) => b.status === s).length ?? 0;

  return (
    <>
      <PageHeader title="Bookings" description="Requests submitted from tour pages." />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, email, phone or tour" className="pl-9" />
        </div>
        <Select value={view} onValueChange={(v) => setView(v as View)}>
          <SelectTrigger className="sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming trips</SelectItem>
            <SelectItem value="all">All bookings</SelectItem>
            {BOOKING_STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s[0].toUpperCase() + s.slice(1)} ({counts(s)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState title={bookings?.length ? "No bookings match" : "No booking requests yet"}>
          {!bookings?.length && "Requests sent from the “Request to book” form on tour pages will appear here."}
        </EmptyState>
      ) : (
        <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Trip date</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Tour</th>
                  <th className="px-4 py-3 font-medium text-right">Pax</th>
                  <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedId(b.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedId(b.id)}
                    tabIndex={0}
                    className="cursor-pointer hover:bg-muted/30 focus:outline-none focus-visible:bg-muted/50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(b.tour_date)}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{b.customer_name}</p>
                      <p className="text-xs text-muted-foreground md:hidden line-clamp-1">{b.tour_title}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell max-w-xs">
                      <p className="line-clamp-1">{b.tour_title}</p>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{b.people}</td>
                    <td className="px-4 py-3 text-right tabular-nums hidden sm:table-cell">
                      {b.total_price != null ? formatEuro(Number(b.total_price)) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelectedId(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selected && <BookingDetail booking={selected} onClose={() => setSelectedId(null)} />}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Bookings;
