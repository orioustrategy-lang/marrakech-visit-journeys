import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, TOUR_IMAGES_BUCKET } from "@/lib/supabase";
import { builtInTours, fromRow, toRow, type Tour, type TourRow } from "@/lib/tours";
import { publicToursKey } from "@/hooks/use-tours";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  tour_id: string | null;
  tour_title: string;
  customer_name: string;
  email: string;
  phone: string | null;
  tour_date: string;
  people: number;
  price_per_person: number | null;
  total_price: number | null;
  pickup_location: string | null;
  notes: string | null;
  status: BookingStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  archived: boolean;
  created_at: string;
}

const db = () => {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
};

const unwrap = <T>({ data, error }: { data: T | null; error: { message: string } | null }) => {
  if (error) throw new Error(error.message);
  return data as T;
};

export const adminKeys = {
  tours: ["admin", "tours"] as const,
  tour: (id: string) => ["admin", "tours", id] as const,
  bookings: ["admin", "bookings"] as const,
  messages: ["admin", "messages"] as const,
};

// ---------------------------------------------------------------- tours

export const useAdminTours = () =>
  useQuery({
    queryKey: adminKeys.tours,
    queryFn: async () =>
      unwrap<TourRow[]>(
        await db().from("tours").select("*").order("sort_order").order("title")
      ).map(fromRow),
  });

export const useAdminTour = (id: string | undefined) =>
  useQuery({
    queryKey: adminKeys.tour(id ?? ""),
    enabled: Boolean(id),
    queryFn: async () => {
      const row = unwrap<TourRow | null>(
        await db().from("tours").select("*").eq("id", id!).maybeSingle()
      );
      return row ? fromRow(row) : null;
    },
  });

const useInvalidateTours = () => {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: adminKeys.tours });
    qc.invalidateQueries({ queryKey: publicToursKey });
  };
};

export const useSaveTour = () => {
  const invalidate = useInvalidateTours();
  return useMutation({
    // The id is the URL slug and is fixed once created, so existing links and
    // bookings keep pointing at the right tour.
    mutationFn: async ({ tour, isNew }: { tour: Tour; isNew: boolean }) => {
      const row = toRow(tour);
      if (!isNew) {
        const { id, ...rest } = row;
        unwrap(await db().from("tours").update(rest).eq("id", id));
      } else {
        unwrap(await db().from("tours").insert(row));
      }
      return tour;
    },
    onSuccess: invalidate,
  });
};

export const useUpdateTourFlags = () => {
  const invalidate = useInvalidateTours();
  return useMutation({
    mutationFn: async ({ id, ...flags }: { id: string; published?: boolean; featured?: boolean }) =>
      unwrap(await db().from("tours").update(flags).eq("id", id)),
    onSuccess: invalidate,
  });
};

export const useDeleteTour = () => {
  const invalidate = useInvalidateTours();
  return useMutation({
    mutationFn: async (id: string) => unwrap(await db().from("tours").delete().eq("id", id)),
    onSuccess: invalidate,
  });
};

/** Copies the built-in tours into the database (skips ids that already exist). */
export const useImportBuiltInTours = () => {
  const invalidate = useInvalidateTours();
  return useMutation({
    mutationFn: async () => {
      const rows = builtInTours.map(toRow);
      unwrap(
        await db().from("tours").upsert(rows, { onConflict: "id", ignoreDuplicates: true })
      );
      return rows.length;
    },
    onSuccess: invalidate,
  });
};

export const uploadTourImage = async (tourId: string, file: File) => {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${tourId || "new"}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await db()
    .storage.from(TOUR_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw new Error(error.message);
  return db().storage.from(TOUR_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
};

// ---------------------------------------------------------------- bookings

export const useBookings = () =>
  useQuery({
    queryKey: adminKeys.bookings,
    queryFn: async () =>
      unwrap<Booking[]>(
        await db().from("bookings").select("*").order("created_at", { ascending: false })
      ),
  });

export const useUpdateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: Pick<Booking, "id"> & Partial<Pick<Booking, "status" | "admin_notes">>) =>
      unwrap(await db().from("bookings").update(patch).eq("id", id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.bookings }),
  });
};

export const useDeleteBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => unwrap(await db().from("bookings").delete().eq("id", id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.bookings }),
  });
};

// ---------------------------------------------------------------- messages

export const useMessages = () =>
  useQuery({
    queryKey: adminKeys.messages,
    queryFn: async () =>
      unwrap<Message[]>(
        await db().from("messages").select("*").order("created_at", { ascending: false })
      ),
  });

export const useUpdateMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: Pick<Message, "id"> & Partial<Pick<Message, "is_read" | "archived">>) =>
      unwrap(await db().from("messages").update(patch).eq("id", id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.messages }),
  });
};

export const useDeleteMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => unwrap(await db().from("messages").delete().eq("id", id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.messages }),
  });
};
