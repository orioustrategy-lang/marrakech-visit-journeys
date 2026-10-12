import { Database } from "lucide-react";

const SetupNotice = () => (
  <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
    <div className="max-w-xl w-full bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
        <Database className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Connect Supabase to use the admin</h1>
      <p className="text-muted-foreground mb-6">
        The admin stores tours, bookings and messages in Supabase. Until it's connected, the public
        site runs on the built-in tour data.
      </p>
      <ol className="space-y-3 text-sm list-decimal pl-5">
        <li>Create a project at supabase.com.</li>
        <li>
          In the SQL editor, run <code className="px-1.5 py-0.5 rounded bg-muted">supabase/migrations/20261012000000_init.sql</code>.
        </li>
        <li>
          Copy <code className="px-1.5 py-0.5 rounded bg-muted">.env.example</code> to{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted">.env.local</code> and fill in the project URL and anon key.
        </li>
        <li>Create your admin user and grant access — see ADMIN.md.</li>
        <li>Restart the dev server.</li>
      </ol>
    </div>
  </div>
);

export default SetupNotice;
