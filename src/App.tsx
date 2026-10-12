import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./i18n";
import PublicLayout from "./components/PublicLayout";
import PageLoader from "./components/PageLoader";
import Index from "./pages/Index";

const Tours = lazy(() => import("./pages/Tours"));
const TourDetail = lazy(() => import("./pages/TourDetail"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./admin/pages/Login"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminTours = lazy(() => import("./admin/pages/ToursList"));
const AdminTourEditor = lazy(() => import("./admin/pages/TourEditor"));
const AdminBookings = lazy(() => import("./admin/pages/Bookings"));
const AdminMessages = lazy(() => import("./admin/pages/Messages"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/day-trips" element={<Navigate to="/tours?category=day-trip" replace />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="tours" element={<AdminTours />} />
                <Route path="tours/new" element={<AdminTourEditor />} />
                <Route path="tours/:id" element={<AdminTourEditor />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
