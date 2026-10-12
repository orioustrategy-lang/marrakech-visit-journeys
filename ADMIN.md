# Admin & Supabase setup

The admin lives at **`/admin`**. It manages tours, booking requests and contact
messages, all stored in Supabase. Without Supabase the public site still works on the
built-in tour data in `src/data/tours.ts`; booking requests then go to WhatsApp and the
contact form opens the visitor's email app.

## 1. Create the database tables

Open your Supabase project → **SQL Editor** → paste the contents of
[`supabase/migrations/20261012000000_init.sql`](supabase/migrations/20261012000000_init.sql) → **Run**.

It is safe to re-run. It creates:

| Object | Purpose |
|---|---|
| `tours` | Tours shown on the site (public can read published ones) |
| `bookings` | "Request to book" submissions (public can insert, only admins read) |
| `messages` | Contact form submissions (public can insert, only admins read) |
| `admins` | Which auth users are admins |
| `is_admin()`, `tour_price_per_person()` | Helpers used by the security policies and the price check |
| `tour-images` storage bucket | Photos uploaded from the admin |

Prices on booking requests are recalculated in the database, so a visitor can't
send a fake price.

## 2. Environment variables

Copy `.env.example` to `.env.local` (and add the same two variables in Vercel/Netlify):

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon public key>
```

Only the **anon** key belongs in the website. Never put the service-role key,
secret key, JWT secret or database password in a `VITE_` variable — anything with
that prefix is shipped to every visitor's browser.

## 3. Create your admin login

1. Supabase → **Authentication → Users → Add user**, enter an email and password,
   tick "Auto confirm user".
2. In the SQL editor, grant that user admin rights:

```sql
insert into public.admins (user_id)
select id from auth.users where email = 'you@example.com';
```

3. Supabase → **Authentication → Sign In / Providers**: turn **off** "Allow new users
   to sign up" so nobody else can create an account.

Sign in at `/admin/login`.

## 4. Import the existing tours

Go to **Admin → Tours → Import built-in tours**. This copies every tour from
`src/data/tours.ts` into the database (existing ones are skipped). From then on, the
database is the source of truth and edits appear on the site immediately.

## Day-to-day

- **Dashboard** — pending requests, trips in the next 14 days, booked revenue,
  requests per month, most-requested tours, unread messages.
- **Tours** — create, edit, publish/unpublish, feature on the home page (★), reorder
  (sort order), upload or reorder photos, edit group price tiers.
- **Bookings** — filter by status, open a request to WhatsApp/email/call the customer,
  mark it confirmed / completed / cancelled, keep internal notes.
- **Messages** — inbox from the contact form; reply by email or WhatsApp, archive.

## Images

Tour photos in `public/images/tours/` are pre-optimized WebP files (a full size and a
`-sm` 640px thumbnail). To add new photos to the built-in data, put the originals under
`public/assets/...`, reference them in `src/data/tours.ts`, then run:

```sh
npm run images:optimize
```

Photos uploaded through the admin go to Supabase Storage and are used as-is, so
resize them to roughly 1600px wide before uploading.
