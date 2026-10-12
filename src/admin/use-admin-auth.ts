import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "not-admin"; session: Session }
  | { status: "admin"; session: Session };

const checkAdmin = async (session: Session | null): Promise<AuthState> => {
  if (!session || !supabase) return { status: "signed-out" };
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    console.error("is_admin check failed", error);
    return { status: "not-admin", session };
  }
  return data ? { status: "admin", session } : { status: "not-admin", session };
};

export const useAdminAuth = () => {
  const [state, setState] = useState<AuthState>(
    supabase ? { status: "loading" } : { status: "signed-out" }
  );

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    const update = (session: Session | null) =>
      checkAdmin(session).then((next) => {
        if (!cancelled) setState(next);
      });

    supabase.auth.getSession().then(({ data }) => update(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Token refreshes don't change admin status; avoid a needless RPC.
      if (event === "TOKEN_REFRESHED") return;
      update(session);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
};

export const signOut = () => supabase?.auth.signOut();
