import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { useT } from "@/i18n";

const NotFound = () => {
  const t = useT();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20 pb-20">
      <Helmet>
        <title>{t("notFound.title")} | Marrakech Discover</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container mx-auto px-4 text-center max-w-lg">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Compass className="h-12 w-12 text-primary" />
        </div>
        <p className="text-7xl font-bold text-primary mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          404
        </p>
        <h1 className="text-2xl font-bold mb-4">{t("notFound.title")}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{t("notFound.body")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2 rounded-full px-6">
            <Link to="/">
              <Home className="h-4 w-4" />
              {t("notFound.home")}
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2 rounded-full px-6">
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
