import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink, ImagePlus, Link2, Loader2, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOUR_CATEGORIES, type Tour, type TourCategory } from "@/lib/tours";
import { thumbnailOf } from "@/lib/images";
import type { PriceTier } from "@/data/tours";
import { uploadTourImage, useAdminTour, useSaveTour } from "../api";
import { ErrorState, PageHeader } from "../components";

const emptyTour: Tour = {
  id: "",
  title: "",
  category: "activity",
  images: [],
  duration: "",
  groupSize: "",
  price: "",
  priceTiers: [{ min: 1, price: 0 }],
  description: "",
  highlights: [],
  included: [],
  notIncluded: [],
  itinerary: [],
  featured: false,
  published: true,
  sortOrder: 0,
};

const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="bg-card border border-border/60 rounded-xl p-5 md:p-6">
    <h2 className="font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
      {title}
    </h2>
    {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
    <div className="mt-5 space-y-4">{children}</div>
  </section>
);

const Field = ({ label, htmlFor, hint, children }: { label: string; htmlFor?: string; hint?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

/** One item per line; kept as raw text while editing so blank lines don't jump around. */
const ListField = ({
  id,
  label,
  hint,
  value,
  onChange,
  rows = 5,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <Field label={label} htmlFor={id} hint={hint ?? "One item per line."}>
    <Textarea id={id} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
  </Field>
);

const TierEditor = ({ tiers, onChange }: { tiers: PriceTier[]; onChange: (t: PriceTier[]) => void }) => {
  const update = (i: number, patch: Partial<PriceTier>) =>
    onChange(tiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 text-xs text-muted-foreground px-1">
        <span>From (people)</span>
        <span>To (empty = no limit)</span>
        <span>€ per person</span>
        <span className="w-9" />
      </div>
      {tiers.map((tier, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
          <Input
            type="number"
            min={1}
            value={tier.min}
            onChange={(e) => update(i, { min: Number(e.target.value) })}
            aria-label={`Tier ${i + 1} minimum people`}
          />
          <Input
            type="number"
            min={1}
            value={tier.max ?? ""}
            onChange={(e) => update(i, { max: e.target.value === "" ? undefined : Number(e.target.value) })}
            aria-label={`Tier ${i + 1} maximum people`}
          />
          <Input
            type="number"
            min={0}
            step="0.01"
            value={tier.price}
            onChange={(e) => update(i, { price: Number(e.target.value) })}
            aria-label={`Tier ${i + 1} price per person`}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange(tiers.filter((_, idx) => idx !== i))}
            aria-label="Remove tier"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const last = tiers[tiers.length - 1];
          const nextMin = last ? (last.max ?? last.min) + 1 : 1;
          onChange([...tiers, { min: nextMin, price: last?.price ?? 0 }]);
        }}
      >
        <Plus className="h-4 w-4" />
        Add tier
      </Button>
    </div>
  );
};

const validateTiers = (tiers: PriceTier[]) => {
  for (const [i, t] of tiers.entries()) {
    if (!Number.isFinite(t.min) || t.min < 1) return `Tier ${i + 1}: "from" must be at least 1.`;
    if (t.max !== undefined && t.max < t.min) return `Tier ${i + 1}: "to" must be ≥ "from".`;
    if (!Number.isFinite(t.price) || t.price <= 0) return `Tier ${i + 1}: price must be greater than 0.`;
  }
  return null;
};

const TourEditor = () => {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const { data: existing, isLoading, error } = useAdminTour(id);
  const save = useSaveTour();

  const [tour, setTour] = useState<Tour>(emptyTour);
  const [lists, setLists] = useState({ highlights: "", included: "", notIncluded: "", itinerary: "" });
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!existing) return;
    setTour({
      ...existing,
      images: existing.images?.length ? existing.images : existing.image ? [existing.image] : [],
      priceTiers: existing.priceTiers ?? [],
    });
    setLists({
      highlights: (existing.highlights ?? []).join("\n"),
      included: (existing.included ?? []).join("\n"),
      notIncluded: (existing.notIncluded ?? []).join("\n"),
      itinerary: (existing.itinerary ?? []).join("\n"),
    });
  }, [existing]);

  if (error) return <ErrorState error={error} />;
  if (!isNew && isLoading) return <Skeleton className="h-96 rounded-xl" />;
  if (!isNew && !isLoading && !existing) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">This tour doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to="/admin/tours">Back to tours</Link>
        </Button>
      </div>
    );
  }

  const set = <K extends keyof Tour>(key: K, value: Tour[K]) => setTour((t) => ({ ...t, [key]: value }));
  const images = tour.images ?? [];
  const tiers = tour.priceTiers ?? [];

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const list = Array.from(files);
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        if (file.size > 8 * 1024 * 1024) throw new Error(`${file.name} is larger than 8 MB`);
        const url = await uploadTourImage(tour.id, file);
        setTour((t) => ({ ...t, images: [...(t.images ?? []), url] }));
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (fileInput.current) fileInput.current.value = "";
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    set("images", next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!SLUG_RE.test(tour.id)) {
      toast.error("The URL slug may only contain lowercase letters, numbers and dashes.");
      return;
    }
    const tierError = validateTiers(tiers);
    if (tierError) {
      toast.error(tierError);
      return;
    }
    const sortedTiers = [...tiers].sort((a, b) => a.min - b.min);
    const minPrice = sortedTiers.length ? Math.min(...sortedTiers.map((t) => t.price)) : undefined;

    const payload: Tour = {
      ...tour,
      title: tour.title.trim(),
      price: tour.price.trim() || (minPrice !== undefined ? `From ${minPrice}€` : ""),
      priceTiers: sortedTiers,
      image: images[0],
      highlights: lines(lists.highlights),
      included: lines(lists.included),
      notIncluded: lines(lists.notIncluded),
      itinerary: lines(lists.itinerary),
    };

    save.mutate(
      { tour: payload, isNew },
      {
        onSuccess: () => {
          toast.success(isNew ? "Tour created" : "Changes saved");
          if (isNew) navigate(`/admin/tours/${payload.id}`, { replace: true });
        },
        onError: (err) =>
          toast.error(err.message.includes("duplicate key") ? "A tour with this URL slug already exists." : err.message),
      }
    );
  };

  return (
    <form onSubmit={handleSave}>
      <Link to="/admin/tours" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3">
        <ArrowLeft className="h-4 w-4" />
        Tours
      </Link>
      <PageHeader
        title={isNew ? "New tour" : tour.title || "Edit tour"}
        actions={
          <>
            {!isNew && (
              <Button variant="outline" asChild>
                <a href={`/tours/${tour.id}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View
                </a>
              </Button>
            )}
            <Button type="submit" disabled={save.isPending || uploading > 0}>
              {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isNew ? "Create tour" : "Save changes"}
            </Button>
          </>
        }
      />

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Section title="Details">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                required
                maxLength={200}
                value={tour.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setTour((t) => ({ ...t, title, id: isNew && !slugTouched ? slugify(title) : t.id }));
                }}
              />
            </Field>
            <Field
              label="URL slug"
              htmlFor="slug"
              hint={isNew ? `marrakechdiscover.com/tours/${tour.id || "…"}` : "The slug can't change after creation so existing links keep working."}
            >
              <Input
                id="slug"
                required
                value={tour.id}
                disabled={!isNew}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("id", slugify(e.target.value));
                }}
              />
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Category">
                <Select value={tour.category} onValueChange={(v) => set("category", v as TourCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TOUR_CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Duration" htmlFor="duration">
                <Input id="duration" placeholder="5 hours" value={tour.duration} onChange={(e) => set("duration", e.target.value)} />
              </Field>
              <Field label="Group size" htmlFor="groupSize">
                <Input id="groupSize" placeholder="2-20 people" value={tour.groupSize} onChange={(e) => set("groupSize", e.target.value)} />
              </Field>
            </div>
            <Field label="Description" htmlFor="description">
              <Textarea id="description" rows={5} value={tour.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </Section>

          <Section title="Photos" description="The first photo is the cover. JPG, PNG or WebP up to 8 MB.">
            {images.length > 0 && (
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <li key={`${src}-${i}`} className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted aspect-[4/3]">
                    <img src={thumbnailOf(src)} alt="" loading="lazy" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/95">Cover</span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-1.5 flex justify-end gap-1 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <Button type="button" size="icon" variant="secondary" className="h-7 w-7" onClick={() => moveImage(i, i - 1)} disabled={i === 0} aria-label="Move earlier">
                        <ArrowUp className="h-3.5 w-3.5 -rotate-90" />
                      </Button>
                      <Button type="button" size="icon" variant="secondary" className="h-7 w-7" onClick={() => moveImage(i, i + 1)} disabled={i === images.length - 1} aria-label="Move later">
                        <ArrowDown className="h-3.5 w-3.5 -rotate-90" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7"
                        onClick={() => set("images", images.filter((_, idx) => idx !== i))}
                        aria-label="Remove photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <Button type="button" variant="outline" onClick={() => fileInput.current?.click()} disabled={uploading > 0}>
                {uploading > 0 ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                {uploading > 0 ? `Uploading ${uploading}…` : "Upload photos"}
              </Button>
              <div className="flex gap-2 flex-1">
                <Input placeholder="…or paste an image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <Button
                  type="button"
                  variant="outline"
                  disabled={!imageUrl.trim()}
                  onClick={() => {
                    set("images", [...images, imageUrl.trim()]);
                    setImageUrl("");
                  }}
                >
                  <Link2 className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </Section>

          <Section title="Content">
            <ListField id="highlights" label="Highlights" value={lists.highlights} onChange={(v) => setLists((l) => ({ ...l, highlights: v }))} />
            <div className="grid md:grid-cols-2 gap-4">
              <ListField id="included" label="What's included" value={lists.included} onChange={(v) => setLists((l) => ({ ...l, included: v }))} rows={7} />
              <ListField id="notIncluded" label="Not included" value={lists.notIncluded} onChange={(v) => setLists((l) => ({ ...l, notIncluded: v }))} rows={7} />
            </div>
            <ListField
              id="itinerary"
              label="Itinerary"
              hint="One step or day per line. Leave empty to hide the itinerary."
              value={lists.itinerary}
              onChange={(v) => setLists((l) => ({ ...l, itinerary: v }))}
              rows={6}
            />
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Visibility">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-xs text-muted-foreground">Visible on the website</p>
              </div>
              <Switch id="published" checked={tour.published} onCheckedChange={(v) => set("published", v)} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor="featured">Featured</Label>
                <p className="text-xs text-muted-foreground">Shown on the home page</p>
              </div>
              <Switch id="featured" checked={tour.featured} onCheckedChange={(v) => set("featured", v)} />
            </div>
            <Field label="Sort order" htmlFor="sortOrder" hint="Lower numbers appear first.">
              <Input id="sortOrder" type="number" value={tour.sortOrder ?? 0} onChange={(e) => set("sortOrder", Number(e.target.value))} />
            </Field>
          </Section>

          <Section title="Pricing" description="Price per person depends on group size.">
            <TierEditor tiers={tiers} onChange={(t) => set("priceTiers", t)} />
            <Field label="Price label" htmlFor="price" hint='Shown on cards. Leave empty to use "From <lowest price>€".'>
              <Input id="price" placeholder="From 40€" value={tour.price} onChange={(e) => set("price", e.target.value)} />
            </Field>
          </Section>

          <Section title="Reviews" description="Shown as social proof on the tour page.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rating" htmlFor="rating">
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min={0}
                  max={5}
                  value={tour.rating ?? ""}
                  onChange={(e) => set("rating", e.target.value === "" ? undefined : Number(e.target.value))}
                />
              </Field>
              <Field label="Review count" htmlFor="reviews">
                <Input
                  id="reviews"
                  type="number"
                  min={0}
                  value={tour.reviews ?? ""}
                  onChange={(e) => set("reviews", e.target.value === "" ? undefined : Number(e.target.value))}
                />
              </Field>
            </div>
          </Section>
        </div>
      </div>
    </form>
  );
};

export default TourEditor;
