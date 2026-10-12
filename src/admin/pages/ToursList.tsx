import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOUR_CATEGORIES, builtInTours, type Tour } from "@/lib/tours";
import { thumbnailOf } from "@/lib/images";
import { getStartingPrice, formatEuro } from "@/lib/pricing";
import { useAdminTours, useDeleteTour, useImportBuiltInTours, useUpdateTourFlags } from "../api";
import { EmptyState, ErrorState, PageHeader } from "../components";

const categoryLabel = (id: string) => TOUR_CATEGORIES.find((c) => c.id === id)?.label ?? id;

const ToursList = () => {
  const { data: tours, isLoading, error } = useAdminTours();
  const importTours = useImportBuiltInTours();
  const updateFlags = useUpdateTourFlags();
  const deleteTour = useDeleteTour();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [toDelete, setToDelete] = useState<Tour | null>(null);

  if (error) return <ErrorState error={error} />;

  const missingBuiltIns = tours ? builtInTours.filter((b) => !tours.some((t) => t.id === b.id)).length : 0;

  const handleImport = () =>
    importTours.mutate(undefined, {
      onSuccess: () => toast.success("Built-in tours imported"),
      onError: (e) => toast.error(e.message),
    });

  const setFlag = (tour: Tour, flags: { published?: boolean; featured?: boolean }) =>
    updateFlags.mutate({ id: tour.id, ...flags }, { onError: (e) => toast.error(e.message) });

  const filtered = (tours ?? []).filter(
    (t) =>
      (category === "all" || t.category === category) &&
      `${t.title} ${t.id}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Tours"
        description={tours ? `${tours.length} tours · ${tours.filter((t) => t.published).length} published` : undefined}
        actions={
          <>
            {missingBuiltIns > 0 && (
              <Button variant="outline" onClick={handleImport} disabled={importTours.isPending}>
                <Download className="h-4 w-4" />
                Import {missingBuiltIns} built-in tours
              </Button>
            )}
            <Button asChild>
              <Link to="/admin/tours/new">
                <Plus className="h-4 w-4" />
                New tour
              </Link>
            </Button>
          </>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tours" className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {TOUR_CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : tours && tours.length === 0 ? (
        <EmptyState title="No tours in the database yet">
          Import the {builtInTours.length} tours that are built into the website to start editing them.
        </EmptyState>
      ) : filtered.length === 0 ? (
        <EmptyState title="No tours match your filters" />
      ) : (
        <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Tour</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">From</th>
                  <th className="px-4 py-3 font-medium text-center">Published</th>
                  <th className="px-4 py-3 font-medium text-center">Featured</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((tour) => {
                  const img = tour.images?.[0] ?? tour.image;
                  return (
                    <tr key={tour.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <Link to={`/admin/tours/${tour.id}`} className="flex items-center gap-3 min-w-[220px]">
                          {img ? (
                            <img src={thumbnailOf(img)} alt="" loading="lazy" className="w-14 h-10 rounded-md object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-14 h-10 rounded-md bg-muted flex-shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p className="font-medium line-clamp-1">{tour.title}</p>
                            <p className="text-xs text-muted-foreground">{tour.duration}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground whitespace-nowrap">
                        {categoryLabel(tour.category)}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell tabular-nums whitespace-nowrap">
                        {formatEuro(getStartingPrice(tour))}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Switch
                          checked={tour.published}
                          onCheckedChange={(published) => setFlag(tour, { published })}
                          aria-label={`Published: ${tour.title}`}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setFlag(tour, { featured: !tour.featured })}
                          className="p-1.5 rounded-md hover:bg-muted"
                          aria-label={tour.featured ? "Remove from home page" : "Feature on home page"}
                          title={tour.featured ? "Featured on home page" : "Feature on home page"}
                        >
                          <Star className={`h-4 w-4 ${tour.featured ? "fill-[#e7c779] text-[#deb85c]" : "text-muted-foreground"}`} />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild title="View on site">
                            <a href={`/tours/${tour.id}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="Edit">
                            <Link to={`/admin/tours/${tour.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete" onClick={() => setToDelete(tour)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this tour?</AlertDialogTitle>
            <AlertDialogDescription>
              "{toDelete?.title}" will be removed from the website. Existing bookings keep their details. To hide it
              temporarily, turn off Published instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                toDelete &&
                deleteTour.mutate(toDelete.id, {
                  onSuccess: () => toast.success("Tour deleted"),
                  onError: (e) => toast.error(e.message),
                })
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ToursList;
