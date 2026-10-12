import { tours as staticTours, type Tour as StaticTour, type PriceTier } from "@/data/tours";
import { supabase } from "@/lib/supabase";

export type TourCategory = StaticTour["category"];

export interface Tour extends StaticTour {
  featured?: boolean;
  published?: boolean;
  sortOrder?: number;
}

export interface TourRow {
  id: string;
  title: string;
  category: TourCategory;
  image: string | null;
  images: string[];
  duration: string;
  group_size: string;
  price: string;
  price_tiers: PriceTier[];
  rating: number | null;
  reviews: number | null;
  description: string;
  highlights: string[];
  included: string[];
  not_included: string[];
  itinerary: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export const TOUR_CATEGORIES: { id: TourCategory; label: string }[] = [
  { id: "activity", label: "Activities" },
  { id: "day-trip", label: "Day Trips" },
  { id: "tour", label: "Multi-Day Tours" },
  { id: "trekking", label: "Trekking" },
  { id: "airport-transfer", label: "Transfers" },
];

// Tours highlighted on the home page when running on the built-in data.
const STATIC_FEATURED = new Set([
  "atlas-mountains-hiking",
  "agafay-sunset-camel-dinner",
  "3-day-merzouga-desert",
  "paragliding-agafay",
  "ouarzazate-ait-ben-haddou",
  "hot-air-balloon",
]);

export const builtInTours: Tour[] = staticTours.map((t, i) => ({
  ...t,
  featured: STATIC_FEATURED.has(t.id),
  published: true,
  sortOrder: i,
}));

export const fromRow = (row: TourRow): Tour => ({
  id: row.id,
  title: row.title,
  category: row.category,
  image: row.image ?? row.images[0] ?? undefined,
  images: row.images,
  duration: row.duration,
  groupSize: row.group_size,
  price: row.price,
  priceTiers: (row.price_tiers ?? []).map((t) => ({
    min: t.min,
    max: t.max ?? undefined,
    price: t.price,
  })),
  rating: row.rating ?? undefined,
  reviews: row.reviews ?? undefined,
  description: row.description,
  highlights: row.highlights ?? [],
  included: row.included ?? [],
  notIncluded: row.not_included ?? [],
  itinerary: row.itinerary ?? [],
  featured: row.featured,
  published: row.published,
  sortOrder: row.sort_order,
});

export const toRow = (tour: Tour): TourRow => ({
  id: tour.id,
  title: tour.title,
  category: tour.category,
  image: tour.images?.[0] ?? tour.image ?? null,
  images: tour.images?.length ? tour.images : tour.image ? [tour.image] : [],
  duration: tour.duration,
  group_size: tour.groupSize,
  price: tour.price,
  price_tiers: (tour.priceTiers ?? []).map((t) =>
    t.max === undefined || t.max === null ? { min: t.min, price: t.price } : t
  ),
  rating: tour.rating ?? null,
  reviews: tour.reviews ?? null,
  description: tour.description,
  highlights: tour.highlights ?? [],
  included: tour.included ?? [],
  not_included: tour.notIncluded ?? [],
  itinerary: tour.itinerary ?? [],
  featured: tour.featured ?? false,
  published: tour.published ?? true,
  sort_order: tour.sortOrder ?? 0,
});

/**
 * Published tours for the public site. Uses Supabase when configured and
 * seeded; otherwise (or if the request fails) the built-in data.
 */
export const fetchPublicTours = async (): Promise<Tour[]> => {
  if (!supabase) return builtInTours;

  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .order("title");

  if (error) {
    console.error("Failed to load tours from Supabase, using built-in data", error);
    return builtInTours;
  }
  return data.length > 0 ? (data as TourRow[]).map(fromRow) : builtInTours;
};
