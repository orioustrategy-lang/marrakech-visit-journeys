/**
 * Optimized tour photos live at /images/tours/<name>.webp with a 640px
 * thumbnail next to them at <name>-sm.webp (see scripts/optimize-images.mjs).
 * Anything else (uploads in Supabase Storage, external URLs) is returned as-is.
 */
export const thumbnailOf = (src: string) =>
  src.startsWith("/images/tours/") && src.endsWith(".webp") && !src.endsWith("-sm.webp")
    ? src.replace(/\.webp$/, "-sm.webp")
    : src;
