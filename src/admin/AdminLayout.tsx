import { Suspense, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CalendarCheck,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Map,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import PageLoader from "@/components/PageLoader";
import { supabase } from "@/lib/supabase";
import { signOut, useAdminAuth } from "./use-admin-auth";
import { useBookings, useMessages } from "./api";
import SetupNotice from "./SetupNotice";

const CountBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
      {count > 99 ? "99+" : count}
    </span>
  ) : null;

const SidebarNav = ({ email, onNavigate }: { email?: string; onNavigate?: () => void }) => {
  const { data: bookings } = useBookings();
  const { data: messages } = useMessages();
  const pending = bookings?.filter((b) => b.status === "pending").length ?? 0;
  const unread = messages?.filter((m) => !m.is_read && !m.archived).length ?? 0;

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/tours", label: "Tours", icon: Map },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck, badge: pending },
    { to: "/admin/messages", label: "Messages", icon: Mail, badge: unread },
  ];

  return (
    <div className="flex flex-col h-full">
      <Link to="/admin" className="px-6 h-16 flex items-center border-b border-border/60" onClick={onNavigate}>
        <img src="/assets/logo.png" alt="Marrakech Discover" className="h-9" />
        <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin</span>
      </Link>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
            {badge !== undefined && <CountBadge count={badge} />}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-border/60 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          View website
        </a>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
        {email && <p className="px-3 pt-2 text-xs text-muted-foreground truncate">{email}</p>}
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const auth = useAdminAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!supabase) return <SetupNotice />;
  if (auth.status === "loading") return <PageLoader />;
  if (auth.status !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const email = auth.session.user.email;

  return (
    <div className="min-h-screen bg-muted/30">
      <Helmet>
        <title>Admin | Marrakech Discover</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <aside className="hidden lg:block fixed inset-y-0 left-0 w-60 bg-card border-r border-border/60">
        <SidebarNav email={email} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <SidebarNav email={email} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-60">
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-card border-b border-border/60 flex items-center px-4 gap-3">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <img src="/assets/logo.png" alt="Marrakech Discover" className="h-8" />
        </header>
        <main className="p-4 md:p-8 max-w-7xl">
          <Suspense fallback={<PageLoader fullScreen={false} />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
