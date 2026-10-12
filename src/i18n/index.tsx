import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en, { type Dictionary } from "./en";
import fr from "./fr";

export type Language = "en" | "fr";
export const LANGUAGES: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

const dictionaries: Record<Language, Dictionary> = { en, fr };

type Leaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];

export type TKey = Leaves<Dictionary>;
type Vars = Record<string, string | number>;

const STORAGE_KEY = "md-lang";

const detectLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    // Storage can be blocked (private mode); fall through to the browser language.
  }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
};

const lookup = (dict: Dictionary, key: string): string | undefined => {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in node) node = (node as Record<string, unknown>)[part];
    else return undefined;
  }
  return typeof node === "string" ? node : undefined;
};

const interpolate = (s: string, vars?: Vars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m)) : s;

interface I18nContext {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TKey, vars?: Vars) => string;
}

const Ctx = createContext<I18nContext | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted; the choice still applies for this visit.
    }
  }, []);

  const t = useCallback(
    (key: TKey, vars?: Vars) => interpolate(lookup(dictionaries[lang], key) ?? lookup(en, key) ?? key, vars),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};

export const useT = () => useLanguage().t;
