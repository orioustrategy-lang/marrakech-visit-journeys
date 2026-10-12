import { Link } from "react-router-dom";
import { Users, Heart, Award, Globe, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useTours } from "@/hooks/use-tours";
import { openWhatsApp, SITE_URL } from "@/lib/contact";
import { useT } from "@/i18n";
import youssefGuide from "@/assets/optimized/youssef-guide.webp";
import moroccanCulture from "@/assets/optimized/moroccan-culture.webp";

const About = () => {
  const t = useT();
  const { data: tours } = useTours();

  const values = [
    { icon: Heart, title: t("about.values.passionTitle"), description: t("about.values.passionBody") },
    { icon: Users, title: t("about.values.localTitle"), description: t("about.values.localBody") },
    { icon: Award, title: t("about.values.qualityTitle"), description: t("about.values.qualityBody") },
    { icon: Globe, title: t("about.values.authenticTitle"), description: t("about.values.authenticBody") },
  ];

  const stats = [
    { value: "6+", label: t("home.stats.years") },
    { value: "10K+", label: t("home.stats.travelers") },
    { value: tours ? String(tours.length) : "30+", label: t("home.stats.experiences") },
    { value: "4.9", label: t("home.stats.rating") },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO title={t("about.seoTitle")} description={t("about.seoDescription")} url={`${SITE_URL}/about`} />

      <section className="relative py-16 md:py-20 bg-[#f1742a] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("about.title")}</h1>
            <p className="text-lg text-white/85">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-primary font-medium mb-4 tracking-wide uppercase text-sm">{t("about.storyEyebrow")}</span>
              <h2 className="text-4xl font-bold mb-6">{t("about.storyTitle")}</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>{t("home.aboutP1")}</p>
                <p>{t("home.aboutP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <img src={youssefGuide} alt={t("home.guideAlt")} loading="lazy" className="col-span-3 h-[420px] md:h-[500px] w-full object-cover rounded-3xl shadow-xl" />
              <img src={moroccanCulture} alt="" loading="lazy" className="col-span-2 h-[420px] md:h-[500px] w-full object-cover rounded-3xl mt-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("about.valuesTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.valuesSubtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl border border-border/50 p-8 text-center card-hover">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 rounded-full px-8">
              <Link to="/tours">
                {t("home.explore")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 rounded-full px-8" onClick={() => openWhatsApp(t("common.whatsappGreeting"))}>
              <Phone className="h-4 w-4" />
              {t("home.startPlanning")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
