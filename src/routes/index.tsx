import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Rocket, Sparkles, Globe2 } from "lucide-react";
import BlackHole from "@/components/ui/black-hole";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Formation Digital — Déclic Madagascar" },
      {
        name: "description",
        content:
          "Déclic Madagascar conçoit des sites, applications et identités visuelles qui font décoller les marques malgaches.",
      },
      { property: "og:title", content: "Formation Digital — Déclic Madagascar" },
      {
        property: "og:description",
        content:
          "Studio digital à Antananarivo : sites web, applications et branding pensés pour la performance.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Globe2,
    title: "Sites web",
    text: "Vitrines et plateformes rapides, pensées pour le mobile et le réseau malgache.",
  },
  {
    icon: Rocket,
    title: "Applications",
    text: "Produits sur mesure, du prototype au lancement, avec un suivi de bout en bout.",
  },
  {
    icon: Sparkles,
    title: "Identité visuelle",
    text: "Logos, chartes et contenus qui donnent une vraie personnalité à votre marque.",
  },
];

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <BlackHole />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-display text-lg font-bold tracking-tight">
            Déclic<span className="text-halo"> Madagascar</span>
          </span>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="#approche" className="transition-colors hover:text-foreground">
              Approche
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <Button asChild size="sm" className="shadow-halo">
            <a href="#contact">Nous écrire</a>
          </Button>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
          <span className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Studio digital · Antananarivo
          </span>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] sm:text-7xl">
            Formation <span className="text-halo">Digital</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Nous créons des expériences web et mobiles qui attirent l&apos;attention
            aussi fort qu&apos;un trou noir — et la transforment en clients.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-halo">
              <a href="#contact">
                Démarrer un projet
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#services">Voir nos services</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Ce que nous faisons</h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Une équipe malgache, des standards internationaux.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-border bg-card/60 p-7 transition-colors hover:border-primary/50"
            >
              <s.icon className="size-6 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="approche"
        className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 md:grid-cols-2"
      >
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Une approche simple</h2>
          <p className="mt-4 text-muted-foreground">
            Cadrage, design, développement, lancement. Chaque étape est courte,
            mesurée et validée avec vous. Pas de jargon, des résultats visibles.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-6">
          {[
            ["48h", "pour un premier retour"],
            ["+60", "projets livrés"],
            ["100%", "sur mesure"],
            ["Tana", "basés à Madagascar"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card/40 p-6">
              <dt className="text-3xl font-bold text-halo">{k}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center shadow-halo">
          <h2 className="text-3xl font-bold sm:text-4xl">Parlons de votre projet</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Écrivez-nous, nous répondons sous 48 heures.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="mailto:contact@declic.mg">contact@declic.mg</a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Déclic Madagascar
      </footer>
    </main>
  );
}
