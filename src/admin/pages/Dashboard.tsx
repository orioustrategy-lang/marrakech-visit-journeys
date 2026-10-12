import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, CalendarCheck, Clock, Euro, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEuro } from "@/lib/pricing";
import { useAdminTours, useBookings, useMessages, type Booking } from "../api";
import { EmptyState, ErrorState, PageHeader, StatusBadge, formatDate } from "../components";

const BAR_COLOR = "hsl(22 80% 48%)";

const StatTile = ({
  label,
  value,
  hint,
  icon: Icon,
  to,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: typeof Clock;
  to?: string;
}) => {
  const body = (
    <div className="bg-card border border-border/60 rounded-xl p-5 h-full hover:border-primary/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-3xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
};

const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

const useStats = (bookings: Booking[] | undefined) =>
  useMemo(() => {
    if (!bookings) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const in14Days = new Date(today);
    in14Days.setDate(today.getDate() + 14);

    const active = bookings.filter((b) => b.status === "confirmed" || b.status === "completed");
    const revenue = active.reduce((sum, b) => sum + (b.total_price ?? 0), 0);
    const pending = bookings.filter((b) => b.status === "pending");
    const upcoming = bookings
      .filter((b) => {
        const d = new Date(`${b.tour_date}T00:00:00`);
        return (b.status === "confirmed" || b.status === "pending") && d >= today && d <= in14Days;
      })
      .sort((a, b) => a.tour_date.localeCompare(b.tour_date));

    // Booking requests received per month, last 6 months.
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth() - 5 + i, 1);
      return { key: monthKey(d), label: d.toLocaleDateString("en-GB", { month: "short" }), requests: 0 };
    });
    for (const b of bookings) {
      const m = months.find((x) => x.key === monthKey(new Date(b.created_at)));
      if (m) m.requests += 1;
    }

    const byTour = new Map<string, { title: string; count: number; people: number }>();
    for (const b of bookings) {
      if (b.status === "cancelled") continue;
      const key = b.tour_id ?? b.tour_title;
      const entry = byTour.get(key) ?? { title: b.tour_title, count: 0, people: 0 };
      entry.count += 1;
      entry.people += b.people;
      byTour.set(key, entry);
    }
    const topTours = [...byTour.values()].sort((a, b) => b.count - a.count).slice(0, 5);

    return { revenue, pending, upcoming, months, topTours, activeCount: active.length };
  }, [bookings]);

const Dashboard = () => {
  const bookings = useBookings();
  const messages = useMessages();
  const tours = useAdminTours();
  const stats = useStats(bookings.data);

  if (bookings.error) return <ErrorState error={bookings.error} />;

  const unread = messages.data?.filter((m) => !m.is_read && !m.archived) ?? [];
  const tourCount = tours.data?.length ?? 0;

  return (
    <>
      <PageHeader title="Dashboard" description="An overview of booking requests and messages." />

      {tours.data && tourCount === 0 && (
        <div className="mb-6 rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm">
            <strong>Your tours database is empty.</strong> The website is showing the built-in tours until you import them.
          </p>
          <Link to="/admin/tours" className="text-sm font-medium text-primary inline-flex items-center gap-1">
            Import tours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {!stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatTile label="Pending requests" value={stats.pending.length} hint="Awaiting your reply" icon={Clock} to="/admin/bookings" />
          <StatTile label="Next 14 days" value={stats.upcoming.length} hint="Pending or confirmed trips" icon={CalendarCheck} to="/admin/bookings" />
          <StatTile
            label="Booked revenue"
            value={formatEuro(Math.round(stats.revenue))}
            hint={`${stats.activeCount} confirmed or completed`}
            icon={Euro}
          />
          <StatTile label="Unread messages" value={unread.length} icon={Mail} to="/admin/messages" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <section className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-5">
          <h2 className="font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Booking requests per month
          </h2>
          <p className="text-xs text-muted-foreground mb-4">Last 6 months, all statuses</p>
          <div className="h-56">
            {stats && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.months} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [v, "Requests"]}
                  />
                  <Bar dataKey="requests" fill={BAR_COLOR} radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="bg-card border border-border/60 rounded-xl p-5">
          <h2 className="font-semibold mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Most requested tours
          </h2>
          {stats && stats.topTours.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
          <ol className="space-y-3">
            {stats?.topTours.map((t, i) => (
              <li key={t.title} className="flex items-start gap-3 text-sm">
                <span className="w-5 text-muted-foreground tabular-nums">{i + 1}.</span>
                <span className="flex-1 line-clamp-2">{t.title}</span>
                <span className="font-medium tabular-nums whitespace-nowrap">
                  {t.count} <span className="text-muted-foreground font-normal">({t.people} pax)</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-card border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Upcoming trips
            </h2>
            <Link to="/admin/bookings" className="text-sm text-primary">
              All bookings
            </Link>
          </div>
          {stats && stats.upcoming.length === 0 ? (
            <EmptyState title="Nothing in the next 14 days" />
          ) : (
            <ul className="divide-y divide-border/60">
              {stats?.upcoming.slice(0, 6).map((b) => (
                <li key={b.id} className="py-3 flex items-center gap-3 text-sm">
                  <div className="w-16 text-muted-foreground">{formatDate(b.tour_date).replace(/ \d{4}$/, "")}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{b.customer_name}</p>
                    <p className="text-muted-foreground truncate">
                      {b.tour_title} · {b.people} pax
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-card border border-border/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Unread messages
            </h2>
            <Link to="/admin/messages" className="text-sm text-primary">
              Inbox
            </Link>
          </div>
          {unread.length === 0 ? (
            <EmptyState title="You're all caught up" />
          ) : (
            <ul className="divide-y divide-border/60">
              {unread.slice(0, 6).map((m) => (
                <li key={m.id} className="py-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <p className="font-medium truncate">{m.name}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDate(m.created_at)}</span>
                  </div>
                  <p className="text-muted-foreground truncate">{m.subject}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
