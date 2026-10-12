import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import type { BookingStatus } from "./api";

export const PageHeader = ({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
        {title}
      </h1>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  confirmed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  completed: "bg-sky-100 text-sky-800 hover:bg-sky-100",
  cancelled: "bg-zinc-200 text-zinc-700 hover:bg-zinc-200",
};

export const BOOKING_STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export const StatusBadge = ({ status }: { status: BookingStatus }) => (
  <Badge className={`capitalize border-0 font-medium ${STATUS_STYLES[status]}`}>{status}</Badge>
);

export const ErrorState = ({ error }: { error: Error }) => (
  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm">
    <p className="font-medium text-destructive mb-1">Couldn't load data</p>
    <p className="text-muted-foreground">{error.message}</p>
  </div>
);

export const EmptyState = ({ title, children }: { title: string; children?: ReactNode }) => (
  <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
    <p className="font-medium mb-1">{title}</p>
    {children && <div className="text-sm text-muted-foreground">{children}</div>}
  </div>
);

export const formatDate = (iso: string, withTime = false) =>
  new Date(iso.length === 10 ? `${iso}T00:00:00` : iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });

export const whatsappLink = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
