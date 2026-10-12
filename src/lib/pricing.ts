import type { PriceTier } from "@/data/tours";

interface Priceable {
  price: string;
  priceTiers?: PriceTier[];
}

const basePriceOf = (price: string) => {
  const match = price.match(/(\d+)/);
  return match ? parseInt(match[1]) : 50;
};

// Mirrors public.tour_price_per_person() in the Supabase migration.
export const getPricePerPerson = (tour: Priceable, people: number) => {
  const tiers = tour.priceTiers;
  if (tiers && tiers.length > 0) {
    for (const tier of tiers) {
      if (people >= tier.min && (tier.max === undefined || tier.max === null || people <= tier.max)) {
        return tier.price;
      }
    }
    return tiers[tiers.length - 1].price;
  }

  const base = basePriceOf(tour.price);
  if (people === 1) return Math.round(base * 1.5);
  if (people === 2) return base;
  if (people <= 4) return Math.round(base * 0.9);
  if (people <= 7) return Math.round(base * 0.8);
  return Math.round(base * 0.7);
};

export const getPricingTiers = (tour: Priceable) => {
  if (tour.priceTiers && tour.priceTiers.length > 0) {
    return tour.priceTiers.map((tier) => ({
      min: tier.min,
      max: tier.max ?? undefined,
      price: tier.price,
    }));
  }
  const base = basePriceOf(tour.price);
  return [
    { min: 1, max: 1, price: Math.round(base * 1.5) },
    { min: 2, max: 2, price: base },
    { min: 3, max: 4, price: Math.round(base * 0.9) },
    { min: 5, max: 7, price: Math.round(base * 0.8) },
    { min: 8, max: undefined, price: Math.round(base * 0.7) },
  ];
};

/** Lowest per-person price, used for sorting and "From" labels. */
export const getStartingPrice = (tour: Priceable) =>
  Math.min(...getPricingTiers(tour).map((t) => t.price));

export const formatEuro = (amount: number) =>
  `€${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
